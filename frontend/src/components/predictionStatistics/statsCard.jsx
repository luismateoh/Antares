import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';

export default function StatsCard(props) {
    const {index, title, stat} = props;
    const bgColor = function () {
        if (stat >= 50) {
            return '#006ba1';
        } else {
            null
        }
    };
    const txColor = function () {
        if (stat >= 50) {
            return '#fff';
        } else {
            null
        }
    };

    return (
        <Stat
            px={{base: 4, md: 8}}
            py={'5'}
            shadow={'base'}
            bg={bgColor}
            rounded={'lg'}
            textColor={txColor}
        >
            <StatLabel fontWeight={'semibold'} isTruncated>
                {title.toUpperCase()}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {stat}%
            </StatNumber>
        </Stat>
    );
}