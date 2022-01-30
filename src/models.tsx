export interface HeartBeatSerie {
    creationDate: Date
    startDate: Date
    endDate: Date
    value: number
}

export interface ActivitySummary{
   dateComponents: Date 
   activeEnergyBurned: number 
   activeEnergyBurnedGoal: number
   activeEnergyBurnedUnit: string
   appleMoveTime: number
   appleMoveTimeGoal: number
   appleExerciseTime: number 
   appleExerciseTimeGoal: number
   appleStandHours: number 
   appleStandHoursGoal: number
}