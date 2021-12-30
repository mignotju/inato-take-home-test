import { Drug, Pharmacy } from "./pharmacy";

describe("[Pharmacy] updateBenefitValue", () => {
  describe("Default case", () => {
    it("should return empty array", () => {
      expect(new Pharmacy().updateBenefitValue()).toEqual([]);
    });

    it("should decrease the benefit and expiresIn by 1 when expiresIn > 0", () => {
      expect(
        new Pharmacy([new Drug("DefaultDrug", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("DefaultDrug", 1, 2)]);
    });

    it("should decrease the benefit by 2 and expiresIn by 1 when expiresIn = 0", () => {
      expect(
        new Pharmacy([new Drug("DefaultDrug", 0, 3)]).updateBenefitValue()
      ).toEqual([new Drug("DefaultDrug", -1, 1)]);
    });

    it("should decrease the benefit by 2 and expiresIn by 1 when expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("DefaultDrug", -2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("DefaultDrug", -3, 1)]);
    });

    it("should not decrease the benefit and expiresIn by 1 when benefit = 0 and expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("DefaultDrug", -5, 0)]).updateBenefitValue()
      ).toEqual([new Drug("DefaultDrug", -6, 0)]);
    });

    it("should not decrease the benefit and expiresIn by 1 when benefit = 0 and expiresIn = 0", () => {
      expect(
        new Pharmacy([new Drug("DefaultDrug", 0, 0)]).updateBenefitValue()
      ).toEqual([new Drug("DefaultDrug", -1, 0)]);
    });

    it("should not decrease the benefit and expiresIn by 1 when benefit = 0 and expiresIn > 0", () => {
      expect(
        new Pharmacy([new Drug("DefaultDrug", 5, 0)]).updateBenefitValue()
      ).toEqual([new Drug("DefaultDrug", 4, 0)]);
    });

    it("should updateBenefitValue for several drugs", () => {
      expect(
        new Pharmacy([
          new Drug("DefaultDrug", 2, 3),
          new Drug("DefaultDrug", 0, 3),
          new Drug("DefaultDrug", -2, 3),
        ]).updateBenefitValue()
      ).toEqual([
        new Drug("DefaultDrug", 1, 2),
        new Drug("DefaultDrug", -1, 1),
        new Drug("DefaultDrug", -3, 1),
      ]);
    });
  });

  describe("Magic Pill", () => {
    it("should always keep expiresIn and benefit same as entry (expiresIn > 0)", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 5, 10)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 5, 10)]);
    });

    it("should always keep expiresIn and benefit same as entry (expiresIn = 0)", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 0, 13)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 0, 13)]);
    });

    it("should always keep expiresIn and benefit same as entry (expiresIn < 0)", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", -4, 12)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", -4, 12)]);
    });

    it("should always keep expiresIn and benefit same as entry (benefit = 0)", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 7, 0)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 7, 0)]);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit by 1 and decrease expiresIn by 1 when expiresIn > 0", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 5, 10)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 4, 11)]);
    });

    it("should increase the benefit by 2 and decrease expiresIn by 1 when expiresIn = 0", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 10)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -1, 12)]);
    });

    it("should increase the benefit by 2 and decrease expiresIn by 1 when expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -5, 10)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -6, 12)]);
    });

    it("should not increase the benefit and decrease expiresIn by 1 when benefit = 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 4, 50)]);
    });

    it("should increase the benefit to 50 and decrease expiresIn by 1 when benefit >= 48 and expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -5, 49)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -6, 50)]);
    });
  });

  describe("Fervex", () => {
    it("should increase the benefit by 1 and decrease expiresIn by 1 when expiresIn > 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 15, 14)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 14, 15)]);
    });

    it("should increase the benefit by 2 and decrease expiresIn by 1 when expiresIn <= 10 and >5 (high limit)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 14)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 9, 16)]);
    });

    it("should increase the benefit by 2 and decrease expiresIn by 1 when expiresIn <= 10 and >5 (low limit)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 6, 12)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 5, 14)]);
    });

    it("should increase the benefit by 3 and decrease expiresIn by 1 when expiresIn <= 5 and >0 (high limit)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 14)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 4, 17)]);
    });

    it("should increase the benefit by 3 and decrease expiresIn by 1 when expiresIn <= 5 and >0 (low limit)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 1, 12)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 0, 15)]);
    });

    it("should drop the benefit to 0 and decrease expiresIn by 1 when expiresIn = 0", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 14)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });

    it("should drop the benefit to 0 and decrease expiresIn by 1 when expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("Fervex", -3, 20)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", -4, 0)]);
    });

    it("should not increase the benefit by 1 and decrease expiresIn by 1 when benefit = 50 expiresIn > 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 15, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 14, 50)]);
    });

    it("should increase benefit to 50 when benefit >= 48 and expiresIn <= 10 and >5", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 9, 49)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 8, 50)]);
    });

    it("should increase benefit to 50 when benefit >= 47 and expiresIn <= 5 and >0", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 4, 48)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 3, 50)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease the benefit by 2 and expiresIn by 1 when expiresIn > 0", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", 1, 1)]);
    });

    it("should decrease the benefit by 4 and expiresIn by 1 when expiresIn = 0", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 5)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", -1, 1)]);
    });

    it("should decrease the benefit by 4 and expiresIn by 1 when expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", -2, 8)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", -3, 4)]);
    });

    it("should decrease the benefit to 0 and expiresIn by 1 when benefit <= 2 and expiresIn >= 0", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 15, 1)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", 14, 0)]);
    });

    it("should decrease the benefit to 0 and expiresIn by 1 when benefit is <= 4 and expiresIn < 0", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", -15, 4)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", -16, 0)]);
    });
  });
});

describe("[Drug] constructor", () => {
  it("should create Drug with benefit input value when input value = 50", () => {
    expect(new Drug("DefaultDrug", -2, 50).benefit).toEqual(50);
  });
  it("should create Drug with benefit = 50 (max benefit value) when input benefit > 50", () => {
    expect(new Drug("Dafalgan", -2, 51).benefit).toEqual(50);
  });
  it("should create Drug with benefit input value when input value = 0", () => {
    expect(new Drug("DefaultDrug", -2, 0).benefit).toEqual(0);
  });
  it("should create Drug with benefit = 0 (min benefit value) when input benefit < 0", () => {
    expect(new Drug("Dafalgan", -2, -1).benefit).toEqual(0);
  });
});
