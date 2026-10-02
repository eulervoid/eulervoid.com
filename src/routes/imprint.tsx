import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@src/data/shared";

export const Route = createFileRoute("/imprint")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="section min-h-[80vh] py-28 space-y-2">
            <h1 className="mb-8">Imprint</h1>
            <p>Disclosures under § 5 TMG</p>
            <p>
                {profile.name}
                <br />
                {profile.street}
                <br />
                {`${profile.postalCode} ${profile.city}`}
            </p>
            <p>E-Mail: {profile.email}</p>
            <p>USt-Id: {profile.vatId}</p>
        </div>
    );
}
