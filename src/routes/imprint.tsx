import { createFileRoute } from "@tanstack/react-router";
import { address } from "@src/data/shared";

export const Route = createFileRoute("/imprint")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="section min-h-[80vh] py-28 space-y-2">
            <h1 className="mb-8">Imprint</h1>
            <p>Disclosures under § 5 TMG</p>
            <p>
                {address.name}
                <br />
                {address.street}
                <br />
                {`${address.postalCode} ${address.city}`}
            </p>
            <p>USt-IdNr. {address.vatId}</p>
        </div>
    );
}
