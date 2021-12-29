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
    if (drug.benefit < 50) {
      drug.benefit = drug.benefit + 1;
    }
    if (drug.expiresIn <= 0) {
      if (drug.benefit < 50) {
        drug.benefit = drug.benefit + 1;
      }
    }
  }

  updateFervexBenefitValue(drug) {
    if (drug.benefit < 50) {
      drug.benefit = drug.benefit + 1;
      if (drug.expiresIn < 11) {
        if (drug.benefit < 50) {
          drug.benefit = drug.benefit + 1;
        }
      }
      if (drug.expiresIn < 6) {
        if (drug.benefit < 50) {
          drug.benefit = drug.benefit + 1;
        }
      }
    }
    if (drug.expiresIn <= 0) {
      drug.benefit = drug.benefit - drug.benefit;
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
          if (this.drugs[i].benefit > 0) {
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          }

          if (this.drugs[i].expiresIn <= 0) {
            if (this.drugs[i].benefit > 0) {
              this.drugs[i].benefit = this.drugs[i].benefit - 1;
            }
          }
          break;
      }

      if (this.drugs[i].name != "Magic Pill") this.drugs[i].expiresIn--;
    }

    return this.drugs;
  }
}
