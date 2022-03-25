import {Box, SimpleGrid, chakra} from "@chakra-ui/react";
import StatsCard from "./statsCard";
import {useEffect, useState} from "react";

export default function PredictionStatistics(props) {
    const [classificationId, setClassificationId] = useState(props.prediction.classificationId);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const st = props.prediction
        delete st.classificationId;

        const sortable = Object.fromEntries(
            Object.entries(st).sort(([, a], [, b]) => b - a)
        )
        setStats(sortable);
    }, [props.prediction]);
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{base: 2, sm: 0, md: 17}}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'xl'}
                py={10}
                fontWeight={'light'}>
                Classification ID: {classificationId}
            </chakra.h1>
            <SimpleGrid columns={{base: 2, md: 4}} spacing={{base: 5, lg: 8}}>
                {Object.entries(stats).map(([key, value],index) => (
                    <StatsCard key={index} index={index} title={key} stat={value}/>
                ))}
            </SimpleGrid>
        </Box>
    );
}