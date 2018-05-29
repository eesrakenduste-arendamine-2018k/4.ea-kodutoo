const AGE = document.getElementById('age')
const WEIGHT = document.getElementById('weight')
const HEIGHT = document.getElementById('height')
const MINCALORIES = document.getElementById('minCalories')
const ACTIVECALORIES = document.getElementById('activeCalories')
const ACTIVITYLEVEL = document.getElementById('activityLevel')
const BODYMASSINDEX = document.getElementById('bmiIndex')
let activityLevelIndex, bmiIndex
let activityMultiplier = 1.2

const maleDailyCalories = () => {
  return 88.362 + (13.397 * WEIGHT.value) + (4.799 * HEIGHT.value) - (5.677 * AGE.value)
}

const femaleDailyCalories = () => {
  return 447.593 + (9.247 * WEIGHT.value) + (3.098 * HEIGHT.value) - (4.330 * AGE.value)
}

const dailyMinCalories = () => {
  if(document.getElementById('male').checked) return Math.round(maleDailyCalories())
  if(document.getElementById('female').checked) return Math.round(femaleDailyCalories())
}

// const bodyMassIndex = () => {
//   return bmiIndex = WEIGHT.value / Math.pow((HEIGHT.value / 100), 2)
// }

ACTIVITYLEVEL.addEventListener('change', () => {
  activityLevelIndex = ACTIVITYLEVEL.selectedIndex
  activityMultiplier = ACTIVITYLEVEL.options[activityLevelIndex].value
})

document.getElementById('calculate').addEventListener('click', (event) => {
  event.preventDefault()
  // BODYMASSINDEX.innerHTML = `${Math.round(bodyMassIndex() * 100) / 100 } on teie kehamassiindeks`
  MINCALORIES.innerHTML = `<b>${dailyMinCalories()}cal.</b> See on sinu päevane minimaalne kalori vajadus.`
  ACTIVECALORIES.innerHTML = `<b>${Math.round(dailyMinCalories() * activityMultiplier)}cal.</b> See on sinu päevane kalori vajadus kaalu säilitamiseks.`
})