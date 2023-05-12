import { useCollection } from "customHooks/useCollection";

export const CalculateBalance = () => {
  const { documents } = useCollection("transactions", ["createdAt", "desc"]);

  const { documents: plans } = useCollection("plans", ["createdAt", "desc"]);

  let incomeBalance = 0;
  let outcomeBalance = 0;
  let currentBalance = 0;

  documents?.forEach((doc) => {
    if (doc.category === "#income") {
      incomeBalance += parseInt(doc.amount);
    } else {
      if (doc.plan === "no-plan") {
        outcomeBalance += parseInt(doc.amount);
      }
    }
  });

  currentBalance = incomeBalance - outcomeBalance;

  plans?.forEach((plan) => {
    currentBalance -= parseInt(plan.budgetAmount);
    outcomeBalance += parseInt(plan.budgetAmount);
  });

  return { incomeBalance, outcomeBalance, currentBalance };
};
