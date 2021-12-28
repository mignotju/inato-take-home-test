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
});
