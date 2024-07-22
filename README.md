<span style="color:orange;">*** WORK IN PROGRESS ***</span>



## Calculate HLQT interest rate
Firstly, we will calculate the HLQT interest rate, as we will need it later on to get APY
```ts
function calculateHLQTInterestRate(total_HLQT, total_staked_HLQT, tvl_in_HBAR, HBAR_price_in_CHF, HCHF_in_stability_pool) {
    
    // Convert TVL(total value locked) in HBAR to CHF
    const tvlInCHF = tvl_in_HBAR * HBAR_price_in_CHF;

    // Calculate the proportion of staked HLQT to total HLQT
    const stakedProportion = total_staked_HLQT / total_HLQT;

    // Calculate the interest rate as a decimal
    return (tvlInCHF / HCHF_in_stability_pool) * stakedProportion;  // Return as a decimal
}
```

## Calculate APY on staking HLQT
Finally, we will get the APY with the previousely calculated interest rate. The compound value for staking HLQT is `365`, rapresenting every day in a year.
```ts
function calculateAPY(interestRateDecimal, compoundingPeriodsPerYear) {

    // calculate apy APY
    const apy =  Math.pow((1 + interestRateDecimal / compoundingPeriodsPerYear), compoundingPeriodsPerYear) - 1;

    // convert APY to percentage
    return (apy * 100).toFixed(2)
}
```

## Example with input / results
In this example we have this values to get the interest rate:
```ts
const total_HLQT = 100000000; // Total supply of HLQT tokens https://docs.hliquity.org/deep-dive/hlqt-rewards-and-distribution
const total_staked_HLQT = 402263.30341629;
const tvl_in_HBAR = 22646.11329873;
const HBAR_price_in_CHF = 0.06454315;
const HCHF_in_stability_pool = 150.77329484;

// Interest rate (in decimal): 
0.03899687649937828

// APY (in %)
3.98
```

## Run the code
To run the code, simply update the variables within index.ts and run `node index.ts` in terminal.
