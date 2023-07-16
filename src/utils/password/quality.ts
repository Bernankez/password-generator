import PasswordQualityCalculator from "password-quality-calculator";
import MostPopularPasswords from "password-quality-calculator/dist/MostPopularPasswords";

PasswordQualityCalculator.PopularPasswords.load(MostPopularPasswords);

export function passwordQuality(password: string) {
  return PasswordQualityCalculator(password);
}
