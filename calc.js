const AGE = document.getElementById('age')
const WEIGHT = document.getElementById('weight')
const HEIGHT = document.getElementById('height')
const MINCALORIES = document.getElementById('minCalories')
const ACTIVECALORIES = document.getElementById('activeCalories')
const ACTIVITYLEVEL = document.getElementById('activityLevel')
let index, result
let activityMultiplier = 1.2

const maleDailyCalories = () => {
  return result = 88.362 + (13.397 * WEIGHT.value) + (4.799 * HEIGHT.value) - (5.677 * AGE.value)
}

const femaleDailyCalories = () => {
  return result = 447.593 + (9.247 * WEIGHT.value) + (3.098 * HEIGHT.value) - (4.330 * AGE.value)
}

const dailyMinCalories = () => {
  if(document.getElementById('male').checked) return Math.round(maleDailyCalories())
  if(document.getElementById('female').checked) return Math.round(femaleDailyCalories())
}

ACTIVITYLEVEL.addEventListener('change', () => {
  index = ACTIVITYLEVEL.selectedIndex
  activityMultiplier = ACTIVITYLEVEL.options[index].value
})

/* const activeCalories = () => {
  console.log(activityLevelValue)
  return Math.round(dailyMinCalories() * activityLevelValue)
} */

document.getElementById('calculate').addEventListener('click', (event) => {
  event.preventDefault()
  MINCALORIES.innerHTML = `${dailyMinCalories()}cal. See on sinu päevane minimaalne kalori vajadus.`
  ACTIVECALORIES.innerHTML = `${Math.round(dailyMinCalories() * activityMultiplier)}cal. See on sinu päevane kalori vajadus kaalu säilitamiseks.`
})