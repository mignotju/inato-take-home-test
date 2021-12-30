const MAX_BENEFIT_VALUE = 50;
const MIN_BENEFIT_VALUE = 0;
const BENEFIT_INCREMENT = 1;

const DRUG_NAME = {
  MAGIC_PILL: "Magic Pill",
  HERBAL_TEA: "Herbal Tea",
  FERVEX: "Fervex",
  DAFALGAN: "Dafalgan",
};

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    /*
    As we don't want to break Drug API in this exercice, I do a silent catch of wrong benefit values
    In real life, I would have discussed with the Product team to know what is the more adapted thing to do: 
    throw an Error or silent catch error
    */
    if (benefit > MAX_BENEFIT_VALUE) {
      this.benefit = MAX_BENEFIT_VALUE;
      return;
    }
    if (benefit < MIN_BENEFIT_VALUE) {
      this.benefit = MIN_BENEFIT_VALUE;
      return;
    }
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateHerbalTeaBenefitValue(drug) {
    const benefitToAdd =
      drug.expiresIn > 0 ? BENEFIT_INCREMENT : 2 * BENEFIT_INCREMENT;
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

  updateDefaultDrugBenefitValue(drug, decreaseFactor = 1) {
    const benefitToRemove =
      drug.expiresIn > 0 ? BENEFIT_INCREMENT : 2 * BENEFIT_INCREMENT;
    drug.benefit = Math.max(
      MIN_BENEFIT_VALUE,
      drug.benefit - decreaseFactor * benefitToRemove
    );
  }

  /*
  This function does 2 things: update benefit and expiresIn 
  Reading its name we don't know it updates expiresIn value. 
  If I had acces to the whole codebase I would have cut it into 2 functions: 
  updateBenefitValue and updateExpiresInValue 
  */
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      switch (this.drugs[i].name) {
        case DRUG_NAME.MAGIC_PILL:
          break;
        case DRUG_NAME.HERBAL_TEA:
          this.updateHerbalTeaBenefitValue(this.drugs[i]);
          break;
        case DRUG_NAME.FERVEX:
          this.updateFervexBenefitValue(this.drugs[i]);
          break;
        case DRUG_NAME.DAFALGAN:
          this.updateDefaultDrugBenefitValue(this.drugs[i], 2);
          break;
        default:
          this.updateDefaultDrugBenefitValue(this.drugs[i]);
          break;
      }

      if (this.drugs[i].name != DRUG_NAME.MAGIC_PILL) this.drugs[i].expiresIn--;
    }

    return this.drugs;
  }
}
