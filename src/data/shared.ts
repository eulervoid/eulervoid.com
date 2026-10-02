import { dedent } from "@src/util";

export const profile = {
    name: import.meta.env.PROFILE_NAME,
    street: import.meta.env.PROFILE_STREET_ADDRESS,
    postalCode: import.meta.env.PROFILE_POSTAL_CODE,
    city: import.meta.env.PROFILE_CITY,
    country: import.meta.env.PROFILE_COUNTRY,
    vatId: import.meta.env.PROFILE_VAT_ID,
    email: import.meta.env.PROFILE_EMAIL,
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
