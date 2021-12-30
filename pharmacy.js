const MAX_BENEFIT_VALUE = 50;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateHerbalTeaBenefitValue(drug) {
    const benefitToAdd = drug.expiresIn > 0 ? 1 : 2;
    drug.benefit = Math.min(MAX_BENEFIT_VALUE, drug.benefit + benefitToAdd);
  }

  updateFervexBenefitValue(drug) {
    if (drug.expiresIn <= 0) {
      drug.benefit = 0;
      return;
    }
    let benefitToAdd;
    if (drug.expiresIn > 10) benefitToAdd = 1;
    else if (drug.expiresIn > 5) benefitToAdd = 2;
    else if (drug.expiresIn > 0) benefitToAdd = 3;
    drug.benefit = Math.min(MAX_BENEFIT_VALUE, drug.benefit + benefitToAdd);
  }

  updateDefaultDrugBenefitValue(drug) {
    if (drug.benefit > 0) {
      drug.benefit = drug.benefit - 1;
    }

    if (drug.expiresIn <= 0) {
      if (drug.benefit > 0) {
        drug.benefit = drug.benefit - 1;
      }
    }
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      switch (this.drugs[i].name) {
        case "Magic Pill":
          break;
        case "Herbal Tea":
          this.updateHerbalTeaBenefitValue(this.drugs[i]);
          break;
        case "Fervex":
          this.updateFervexBenefitValue(this.drugs[i]);
          break;
        default:
          this.updateDefaultDrugBenefitValue(this.drugs[i]);
          break;
      }

      if (this.drugs[i].name != "Magic Pill") this.drugs[i].expiresIn--;
    }

    return this.drugs;
  }
}
