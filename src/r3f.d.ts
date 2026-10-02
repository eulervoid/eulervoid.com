import { DitherMaterialType } from "~/components/DitheredMedia";
import { MaterialNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
    interface ThreeElements {
        ditherMaterial: MaterialNode<DitherMaterialType, typeof DitherMaterialType>;
    }
}
