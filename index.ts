function calculateHLQTInterestRate(total_HLQT, total_staked_HLQT, tvl_in_HBAR, HBAR_price_in_CHF, HCHF_in_stability_pool) {
    // Convert TVL(total value locked) in HBAR to CHF
    const tvlInCHF = tvl_in_HBAR * HBAR_price_in_CHF;

    // Calculate the proportion of staked HLQT to total HLQT
    const stakedProportion = total_staked_HLQT / total_HLQT;

    // Calculate the interest rate as a decimal
    return (tvlInCHF / HCHF_in_stability_pool) * stakedProportion;
}

function calculateAPY(interestRateDecimal, compoundingPeriodsPerYear) {

    // calculate APY
    const apy =  Math.pow((1 + interestRateDecimal / compoundingPeriodsPerYear), compoundingPeriodsPerYear) - 1;

    // convert APY to percentage
    return (apy * 100).toFixed(2)
}

// variables
const total_HLQT = 100000000; // Total supply of HLQT tokens https://docs.hliquity.org/deep-dive/hlqt-rewards-and-distribution
const total_staked_HLQT = 402263.30341629;
const tvl_in_HBAR = 22646.11329873;
const HBAR_price_in_CHF = 0.06454315;
const HCHF_in_stability_pool = 150.77329484;

const compoundingPeriodsPerYear = 365;

const interestRateDecimal = calculateHLQTInterestRate(total_HLQT, total_staked_HLQT, tvl_in_HBAR, HBAR_price_in_CHF, HCHF_in_stability_pool);
console.log('Interest Rate (Decimal):', interestRateDecimal);

const APY = calculateAPY(interestRateDecimal, compoundingPeriodsPerYear);
console.log('APY (%):', APY);