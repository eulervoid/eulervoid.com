import { dedent } from "@src/util";

export const address = {
    name: "",
    street: "",
    postalCode: "",
    city: "",
    vatId: "",
    email: "",
} as const;

export const snippets = {
    experience: dedent`
        a decade of professional experience \
        shipping full-stack product and infrastructure in \
        **TypeScript**, **Python**, and **Rust**, with a background in **C++** \
        audio programming, generative graphics and motion.
    `,
    rustInterest: dedent`
        Especially interested in Rust-heavy work across backend, \
        audio and graphics.
    `,
} as const;
