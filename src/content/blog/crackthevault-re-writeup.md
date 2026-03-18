---
title: "CTF Writeup: Cracking the Vault — Reverse Engineering Challenge"
description: "A reverse engineering writeup for the 'CrackTheVault' binary challenge from DemoCTF 2025. We analyze a stripped ELF binary, defeat anti-debugging, and recover the flag."
pubDate: "Mar 16 2025"
tags: ["reverse-engineering", "CTF", "writeup", "binary-analysis"]
categories: ["CTF Writeups"]
---

## Challenge Info

| Field | Details |
|---|---|
| **CTF** | DemoCTF 2025 |
| **Challenge** | CrackTheVault |
| **Category** | Reverse Engineering |
| **Difficulty** | Medium |
| **Points** | 300 |
| **Solves** | 42 |

> **tl;dr** — Stripped ELF binary with anti-debugging checks. Patch out the `ptrace` calls, reverse the key derivation algorithm in Ghidra, and reconstruct the flag from XOR-encrypted constants.

---

## Initial Analysis

We're given a single file: `crackvault`. Let's start with basic recon.

```bash
$ file crackvault
crackvault: ELF 64-bit LSB executable, x86-64, version 1 (SYSV),
dynamically linked, stripped

$ checksec crackvault
    Arch:     amd64-64-little
    RELRO:    Full RELRO
    Stack:    Canary found
    NX:       NX enabled
    PIE:      PIE enabled
```

The binary is **stripped** and has all common protections enabled. Running it prompts for a password:

```bash
$ ./crackvault
╔══════════════════════════════╗
║     ENTER THE VAULT KEY     ║
╚══════════════════════════════╝
> test123
[-] Access Denied.
```

---

## Static Analysis with Ghidra

After loading the binary into **Ghidra**, I identified the `main` function by tracing from `__libc_start_main`. Here's the decompiled pseudocode:

```c
int main(int argc, char **argv) {
    char input[64];
    
    // Anti-debug check
    if (ptrace(PTRACE_TRACEME, 0, 0, 0) == -1) {
        puts("[-] Nice try.");
        exit(1);
    }
    
    print_banner();
    printf("> ");
    fgets(input, 64, stdin);
    
    // Remove newline
    input[strcspn(input, "\n")] = 0;
    
    if (check_key(input)) {
        printf("[+] Flag: democtf{%s}\n", derive_flag(input));
    } else {
        puts("[-] Access Denied.");
    }
    
    return 0;
}
```

Two interesting things:
1. **Anti-debugging** via `ptrace(PTRACE_TRACEME)` — common trick to prevent debugger attachment
2. A `check_key()` function that validates our input

---

## Defeating Anti-Debugging

The `ptrace` check prevents us from running this under GDB directly. We can patch it out:

```python
# patch_ptrace.py
with open("crackvault", "rb") as f:
    data = bytearray(f.read())

# Find the ptrace call and NOP it out
# ptrace call at offset 0x1234, replace with xor eax,eax + nops
patch_offset = 0x1234
data[patch_offset:patch_offset+5] = b'\x31\xc0\x90\x90\x90'  # xor eax, eax; nop; nop; nop

with open("crackvault_patched", "wb") as f:
    f.write(data)
```

Alternatively, you can use `LD_PRELOAD` to hook `ptrace`:

```c
// fake_ptrace.c
// gcc -shared -o fake_ptrace.so fake_ptrace.c
long ptrace(int request, ...) {
    return 0;
}
```

```bash
$ LD_PRELOAD=./fake_ptrace.so ./crackvault
```

---

## Reversing the Key Check

The `check_key()` function implements a custom verification algorithm. After cleaning up the decompilation in Ghidra:

```c
bool check_key(char *input) {
    if (strlen(input) != 16) return false;
    
    uint8_t xor_table[] = {
        0x5a, 0x3c, 0x29, 0x17, 0x4e, 0x62, 0x0b, 0x73,
        0x41, 0x55, 0x38, 0x2d, 0x19, 0x6f, 0x04, 0x58
    };
    
    char expected[] = "0xSECURE_V4ULT!";
    
    for (int i = 0; i < 16; i++) {
        if ((input[i] ^ xor_table[i]) != expected[i]) {
            return false;
        }
    }
    return true;
}
```

The key is XOR'd against a hardcoded table and compared to an expected string. We can reverse this easily:

```python
xor_table = [0x5a, 0x3c, 0x29, 0x17, 0x4e, 0x62, 0x0b, 0x73,
             0x41, 0x55, 0x38, 0x2d, 0x19, 0x6f, 0x04, 0x58]
expected = b"0xSECURE_V4ULT!"

key = bytes([e ^ x for e, x in zip(expected, xor_table)])
print(f"Key: {key.decode()}")
# Key: jDoFn3tR3v3rs3!
```

---

## Getting the Flag

```bash
$ LD_PRELOAD=./fake_ptrace.so ./crackvault
╔══════════════════════════════╗
║     ENTER THE VAULT KEY     ║
╚══════════════════════════════╝
> jDoFn3tR3v3rs3!
[+] Flag: democtf{r3v3rs1ng_1s_fun_4nd_pr0f1t4bl3}
```

## Flag

```
democtf{r3v3rs1ng_1s_fun_4nd_pr0f1t4bl3}
```

---

## Key Takeaways

1. **Anti-debugging checks** like `ptrace(PTRACE_TRACEME)` are easy to bypass via patching or `LD_PRELOAD`
2. **XOR-based key verification** is a classic reversing pattern — always check for hardcoded tables
3. **Ghidra's decompiler** does a great job even on stripped binaries — learn to rename functions and retype variables for cleaner output
4. When in doubt, **patch and run** — sometimes dynamic analysis is faster than static

---

*Writeup by [0xJJKings](https://github.com/0xJJKings) — [Team Nova](https://n0va.in)*
