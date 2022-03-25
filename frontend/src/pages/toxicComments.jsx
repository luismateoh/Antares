import ToxicComment from "../components/toxicComment";
import {NextSeo} from "next-seo";
import {Center} from "@chakra-ui/react";
export default function PageToxicComments() {
    return (
        <>
            <NextSeo title="Toxic Comment"/>
            <Center>
                <ToxicComment/>
            </Center>

        </>


    )
}
