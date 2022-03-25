
import {NextSeo} from "next-seo";
import FruitOrVegetable from "../components/fruitOrVegetable";
import {Center} from "@chakra-ui/react";

export default function PageFoV() {
    return (
        <>
            <NextSeo title="Fruit or vegetable"/>
            <Center>
                <FruitOrVegetable/>
            </Center>
        </>
    )
}
