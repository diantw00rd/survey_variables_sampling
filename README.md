# Stated Preference Survey for EV Charging Decisions

This project implements Latin Hypercube Sampling (LHS) and Fractional Factorial Design (FFD) methods to generate scenarios for a stated preference survey. The survey focuses on examining the factors that influence electric vehicle (EV) users' charging decisions. These scenarios will be used to assess user preferences as part of a thesis research study.

# Overview

The stated preference survey presents hypothetical scenarios to EV users, exploring how different factors (e.g., price, state of charge, and location) influence their decision to charge their vehicles. This repository provides:

1. Code for generating scenarios using LHS and FFD.

2. Comparisons between the two methods.

3. Algorithmic explanations of how these methods work with the specified variables. Please find the flowcharts for both methods in flowcharts.md file.

# Parameters for the Survey

The following parameters and their respective levels are considered in this project:
| Parameter               | Levels                                                             |
|-------------------------|--------------------------------------------------------------------|
| Price                  | FREE, $0.12/kWh, $0.45/kWh, $1.5/kWh, $5/kWh                      |
| State of Charge        | 20%, 35%, 50%, 65%, 80%                                           |
| Remaining Travel Distance | 5 km, 15 km, 30 km, 100 km, 200 km                             |
| Parking Duration       | 30 minutes, 1 hour, 2 hours, 4 hours, 6+ hours                   |
| Charger Power Level    | 7.2 kW, 11 kW, 50 kW                                              |
| Location               | Home, Workplace/School, Shopping, Daycare, Other                 |
| Time of Day            | Morning, Noon, Afternoon, Evening, Late evening/Night            |


# Methods Used

## 1. Latin Hypercube Sampling (LHS)

Description: LHS is a statistical method for generating a sample of plausible scenarios that ensures an even distribution across the range of each variable.

Key Requirement: Ideally, the number of variables and levels should be equal for balanced sampling. In this project, I handle uneven levels by appropriately mapping samples to available levels.

## 2. Fractional Factorial Design (FFD)

Description: FFD is a design of experiments approach that reduces the number of scenarios by assuming some interactions between factors are negligible.

Key Requirement: FFD generates scenarios based on binary representations, which are then mapped to the available levels for each variable.
##
|                          | Latin Hypercube Sampling (LHS)                                  | Fractional Factorial Design (FFD)                     |
|--------------------------|----------------------------------------------------------------|------------------------------------------------------|
| **Pros**                 | - Ensures even distribution across parameter levels           | - Reduces the number of scenarios required          |
|                          | - Flexible sample size                                        | - Simple to implement                               |
|                          | - Suitable for non-linear relationships                      | - Useful for exploring main effects efficiently     |
| **Cons**                 | - More computationally intensive                              | - May not fully explore parameter space             |
|                          | - Can result in unbalanced designs if levels are uneven       | - Assumes negligible higher-order interactions      |
| **Limitations/Requirements** | - Requires mapping for uneven levels                       | - Sample size is predefined based on factors        |
|                          | - Best for continuous variables or equal levels across factors | - Less suitable for complex designs with many levels|
##
For any questions or contributions, please open an issue or contact dshakhov@uwaterloo.ca
