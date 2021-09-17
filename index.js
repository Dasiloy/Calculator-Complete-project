// reset function
function startOver() {
  //clear loan inputs
  document.loan_form.loan_amt.value = "";
  document.loan_form.years.value = "";
  document.loan_form.rate.value = "";
  //clear loan outputs
  document.getElementById("loan_info").innerHTML = "";
  document.getElementById("table").innerHTML = "";
}

//round function
function round(num, dec) {
  return (
    Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
  ).toFixed(2);
}

//calculate loan information
function calculate(loan_amt, years, rate) {
  let i = rate / 100;
  let m_i = i / 12;
  let months = parseInt(years * 12);
  let power = Math.pow(1 + m_i, months);
  let numerator = m_i * power;
  let denominator = power - 1;
  let monthly_payment =
    loan_amt * (numerator / denominator);

  let table = "";
  table += "<h2>Anotization shedule</h2>";
  table += "<table class='table-data'>";
  table += "<tr><th class='head'>year</th>";
  table += "<th class='head'>month</th>";
  table += "<th class='head'> monthly payment</th>";
  table += "<th class='head'>interest</th>";
  table += "<th class='head'>principal</th>";
  table += "<th class='head'> balance</th>";
  table += "<th class='head'>total repayment</th>";
  table += "</tr>";

  let year_counter = 1;
  let month_counter = 1;
  let total_interest = 0;
  let total_paid = 0;
  let principal_repayment = 0;
  let towards_interest = 0;
  let towards_balance = 0;
  let current_balance = loan_amt;
  let yearly_interest = 0;
  let yearly_principal = 0;

  while (current_balance > 1) {
    towards_interest = (i / 12) * current_balance;
    towards_balance = monthly_payment - towards_interest;
    current_balance = current_balance - towards_balance;
    total_interest += towards_interest;
    if (month_counter > 12 && month_counter % 12 === 1) {
      yearly_interest = 0;
    }
    yearly_interest += towards_interest;
    principal_repayment += towards_balance;
    if (month_counter > 12 && month_counter % 12 === 1) {
      yearly_principal = 0;
    }
    yearly_principal += towards_balance;
    total_paid += towards_interest + towards_balance;
    year_counter =
      month_counter % 12 === 1 && month_counter > 12
        ? year_counter + 1
        : year_counter;

    month_counter =
      month_counter > 12
        ? month_counter - 12
        : month_counter;

    table += "<tr>";
    table +=
      "<tr><td class='data'>" + year_counter + "</d>";
    table += "<td class='data'>" + month_counter + "</td>";
    table +=
      "<td class='data'>" +
      "&#163;" +
      round(monthly_payment, 2) +
      "</td>";
    table +=
      "<td class='data'>" +
      "&#163;" +
      round(towards_interest, 2) +
      "</td>";
    table +=
      "<td class='data'>" +
      "&#163;" +
      round(towards_balance, 2) +
      "</td>";
    table +=
      "<td class='data'>" +
      "&#163;" +
      round(current_balance, 2) +
      "</td><tr/>";
    table +=
      month_counter === 12
        ? "<tr><td class='data-center' colspan='3' >" +
          "year  " +
          year_counter +
          "  total" +
          "</td><td class='data-extra'>" +
          "&#163;" +
          round(yearly_interest, 2) +
          "</td><td class='data-extra'>" +
          "&#163;" +
          round(yearly_principal, 2) +
          "</td><td class='data-extra'>" +
          "&#163;" +
          round(current_balance, 2) +
          "</td><td class='data-extra'></td></tr><tr><td class='data-center' colspan='3'>Returning total</td><td class='data-extra'>" +
          "&#163;" +
          round(total_interest, 2) +
          "</td><td class='data-extra'>" +
          "&#163;" +
          round(principal_repayment, 2) +
          "</td><td class='data-extra'></td><td class='data-extra'>" +
          "&#163;" +
          round(total_paid, 2) +
          "</td></tr>"
        : "";
    month_counter++;
  }

  table += "</table> ";

  //payment_info\
  let overall_total = principal_repayment + total_interest;
  let info = "";
  info += "<h2>mortgage summary</h2>";
  info += "<table width='300' class='table'>";
  info += "<tr><td>Loan Amount<td/>";
  info += "<td >" + "&#163;" + loan_amt + "<td/><tr/>";

  info += "<tr><td>term of loan<td/>";
  info += "<td>" + years + "yrs" + "<td/><tr/>";

  info += "<tr><td>Interest Rate<td/>";
  info += "<td>" + rate + "%" + "<td/><tr/>";

  info += "<tr><td>monthly payment<td/>";
  info +=
    "<td>" +
    "&#163;" +
    round(monthly_payment, 2) +
    "<td/><tr/>";

  info += "<tr><td>overall payment<td/>";
  info +=
    "<td>" +
    "&#163;" +
    round(overall_total, 2) +
    "<td/><tr/><table/>";

  document.getElementById("loan_info").innerHTML = info;
  document.getElementById("table").innerHTML = table;
}

// validate loan inputs
function validate() {
  const loan_amt = document.loan_form.loan_amt.value;
  const years = document.loan_form.years.value;
  const rate = document.loan_form.rate.value;

  if (loan_amt <= 0 || isNaN(Number(loan_amt))) {
    document.loan_form.loan_amt.style.border =
      " 1px solid red";
  } else if (years <= 0 || parseInt(years) != years) {
    document.loan_form.years.style.border =
      " 1px solid red";
  } else if (rate <= 0 || isNaN(Number(rate))) {
    document.loan_form.rate.style.border = " 1px solid red";
  } else {
    document.loan_form.loan_amt.style.border =
      "1px solid #084f0f";
    document.loan_form.years.style.border =
      "1px solid #084f0f";
    document.loan_form.rate.style.border =
      "1px solid #084f0f";
    calculate(
      parseFloat(loan_amt),
      parseInt(years),
      parseFloat(rate)
    );
  }
}
