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
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      switch (this.drugs[i].name) {
        case "Magic Pill":
          break;
        case "Herbal Tea":
          if (this.drugs[i].benefit < 50) {
            this.drugs[i].benefit = this.drugs[i].benefit + 1;
          }
          this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
          if (this.drugs[i].expiresIn < 0) {
            if (this.drugs[i].benefit < 50) {
              this.drugs[i].benefit = this.drugs[i].benefit + 1;
            }
          }
          break;
        case "Fervex":
          if (this.drugs[i].benefit < 50) {
            this.drugs[i].benefit = this.drugs[i].benefit + 1;
            if (this.drugs[i].expiresIn < 11) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
            if (this.drugs[i].expiresIn < 6) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
          }
          this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
          if (this.drugs[i].expiresIn < 0) {
            this.drugs[i].benefit =
              this.drugs[i].benefit - this.drugs[i].benefit;
          }
          break;
        default:
          if (this.drugs[i].benefit > 0) {
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          }

          this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
          if (this.drugs[i].expiresIn < 0) {
            if (this.drugs[i].benefit > 0) {
              this.drugs[i].benefit = this.drugs[i].benefit - 1;
            }
          }
          break;
      }
    }

    return this.drugs;
  }
}
