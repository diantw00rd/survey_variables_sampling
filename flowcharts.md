graph TD
    subgraph LHS ["Latin Hypercube Sampling Algorithm"]
        A1[Start LHS] --> B1[Define 7 variables:<br/>Price, SoC, Distance, etc.]
        B1 --> C1[Create n_samples × 7 matrix<br/>with values between 0-1]
        C1 --> D1[Divide each variable range<br/>into n_samples equal intervals]
        D1 --> E1[Sample once from each interval<br/>without replacement]
        E1 --> F1[Map continuous values to<br/>discrete parameter levels]
        F1 --> G1[Generate final scenarios]
    end

    subgraph FFD ["Fractional Factorial Design Algorithm"]
        A2[Start FFD] --> B2[Define 7 variables<br/>with their levels]
        B2 --> C2[Generate 2^k design matrix<br/>with -1 and +1 values]
        C2 --> D2[Select subset of runs<br/>based on n_samples]
        D2 --> E2[Map -1 to minimum level<br/>+1 to maximum level]
        E2 --> F2[Interpolate middle levels<br/>if available]
        F2 --> G2[Generate final scenarios]
    end
