type NumericRange<
    START_ARR extends number[],
    END extends number,
    ACC extends number = never,
> = START_ARR['length'] extends END
    ? ACC | END
    : NumericRange<[...START_ARR, 1], END, ACC | START_ARR['length']>;

export default NumericRange;
