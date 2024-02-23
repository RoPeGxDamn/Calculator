/******************* Получение DOM-элементов ********************/
const computedStr = document.querySelector(".computed__block");
const resultStr = document.querySelector(".result__value");
const display = document.querySelector(".calc__display");
const calcBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear-button");
const deleteBtn = document.querySelector(".backspace");
const dotBtn = document.querySelector(".dot");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const equalSign = document.querySelector(".equal");
const percentBtn = document.querySelector(".percent");
const resultBtn = document.querySelector(".result-button");
const calcGrid = document.querySelector(".calc__grid");
const additionalBtns = document.querySelectorAll(".additional");
const piBtn = document.querySelector('.pi');
const expBtn = document.querySelector('.exp');
const extendBtn = document.querySelector('.extend-button');
const openBracketBtn = document.querySelector('.open-bracket');
const closeBracketBtn = document.querySelector('.close-bracket');
const lnBtn = document.querySelector('.ln');
const lgBtn = document.querySelector('.lg');
const negDegreeBtn = document.querySelector('.neg-degree');
const degreeBtn = document.querySelector('.degree');
const rootBtn = document.querySelector('.root');
const radicalBtn = document.querySelector('.radical');
const changeSignBtn = document.querySelector('.plus-minus');
const toggler = document.querySelector('.toggler');
const checkbox = document.querySelector('.checkbox');
const instruction = document.querySelector('.instruction__block');
const shapeArrow = document.querySelector('.shape__arrow');
const colorArrow = document.querySelector('.color__arrow');
/******************* Допустимые значения кнопок *******************/
const vldBtnStr = "0123456789/*%.-+=()";
/**************** Объект "Калькулятор" ******************/
const Calc = {
  items: [],
  inputStr: '',
  addMode: true,
  upIndex: true,
  currentOperation: null,
  resultDone: false,
  itemIndex: 0,
  extendMode: false,
  constEdit: true,
  sign: '+'
};
/***************** Стилистика кнопок ************/
const activeBtn = `box-shadow: 1px 1px 10px black !important;
                   transform: scale(0.95) !important;
                   transition: .1s all !important`;
const exitBtn = `<span class="material-icons">exit_to_app</span>`;
const expandBtn = `<span class="material-icons">open_with</span>`
const emptyDisplayBtn = 'AC';
const smthOnDisplayBtn = 'C';
/**************** Математические константы **************************/
const exp = Math.E.toFixed(9);
const pi = Math.PI.toFixed(9);
/******************** Функция подсчета *****************/
function calc(e) {
  switch (e.key) {
    /*************** Обработка цифр ******************/
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9": {
      if (this.resultDone) {
        this.inputStr = computedStr.textContent = e.key;
        resultStr.textContent = setRightValue(eval(this.inputStr));
        this.resultDone = false;
        this.addMode = false;
      } 
      else {
        if (this.items.length == 0 || String(this.items[this.itemIndex]).length <= 15) {
          if(this.constEdit) {
            this.inputStr += e.key;
            computedStr.textContent += e.key;
            resultStr.textContent = setRightValue(eval(this.inputStr));
          }
        }
      }
      if (this.addMode) {
        if(this.constEdit) {
          this.items.push(e.key);
          this.addMode = false;
          this.currentOperation = null;
  
          if (!this.upIndex) {
            this.itemIndex++;
            this.upIndex = true;
          }
        }
      } 
      else {
        if(this.constEdit) {
          if (String(this.items[this.itemIndex]).length <= 15) this.items[this.itemIndex] += e.key;
        }
      }
      break;
    }
    /************************ Удаление одного символа ****************************/
    case "Backspace":
    case "Delete": {
      if (computedStr.textContent.length != 0 &&
          this.inputStr.length != 0) {
        let opStr = "**, +, -, /, *, (, )";
        let bracketExist = false;

        if (!this.resultDone) {
          computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);

          if(this.items[this.itemIndex] == exp || this.items[this.itemIndex] == pi || this.items[this.itemIndex] == '**') {
            this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
          }
          else {
            if(this.inputStr[this.inputStr.length - 1] == ')' ||
               this.inputStr[this.inputStr.length - this.items[this.itemIndex].length - 2] == '(' || this.inputStr[this.inputStr.length - this.items[this.itemIndex].length - 1] == '(') {
              bracketExist = true;
            }
              this.inputStr = this.inputStr.substring(0, this.inputStr.length - 1);
          }

          if (this.items[this.itemIndex] == "+" ||
              this.items[this.itemIndex] == "-" ||
              this.items[this.itemIndex] == "/" ||
              this.items[this.itemIndex] == "*" ||
              this.items[this.itemIndex] == "**") {
            this.currentOperation = null;
            this.addMode = false;
          }

          if(this.items[this.itemIndex] == exp ||
             this.items[this.itemIndex] == pi) {
               this.addMode = true;
          }

          if(this.items[this.itemIndex] == exp ||
             this.items[this.itemIndex] == pi ||
             this.items[this.itemIndex] == "**") {
            this.items[this.itemIndex] = "";
            this.constEdit = true;
          }
          else {
            if(!bracketExist) this.items[this.itemIndex] = this.items[this.itemIndex].substring(0, this.items[this.itemIndex].length - 1);
          }

          if (this.items[this.itemIndex] == "" &&
              this.items.length != 1) {
            this.itemIndex--;
            this.items.pop();
          }

          if(this.items[this.itemIndex] == pi || this.items[this.itemIndex] == exp) this.constEdit = false;

          opStr.split(", ").forEach((item) => {
            if (item == this.items[this.itemIndex] && this.items[this.itemIndex].length > 1) {
              this.currentOperation = item;
              resultStr.textContent = setRightValue(eval(this.items.slice(0, this.items.length - 1).join("")));
            }
            else if(item == this.items[this.itemIndex] && item == this.sign) {
              this.currentOperation = null;
              resultStr.textContent = setRightValue(eval(this.items.slice(0, this.items.length - 1).join("")));
            }
          });

          if (this.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                          transition: .2s ease-in-out`;

          if (this.items.length == 0 ||
              this.items[0] == '') {
            (this.items.length > 0) ? this.items.pop() : '';
            this.constEdit = true;
            this.addMode = true;
            computedStr.textContent = this.inputStr = "";
            resultStr.textContent = setRightValue(eval(this.inputStr));
          }

          if (!bracketExist && opStr.split(', ').indexOf(this.items[this.itemIndex]) == -1 ) resultStr.textContent = setRightValue(eval(this.inputStr));
        }
          else {
          computedStr.textContent = this.inputStr = resultStr.textContent;
          computedStr.textContent = this.inputStr = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
          this.items[this.itemIndex] = this.items[this.itemIndex].substring(0, this.items[this.itemIndex].length - 1);
          if (this.items[this.itemIndex] == "" &&
              this.items.length != 1) {
            this.itemIndex--;
            this.items.pop();
          }
          if (opStr.split(', ').indexOf(this.items[this.itemIndex]) == -1) resultStr.textContent = setRightValue(eval(this.inputStr));
          
          if (this.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                          transition: .2s ease-in-out`;
          if (opStr.split(', ').indexOf(this.items[this.itemIndex]) != -1 &&
            this.items.length == 1) {
            this.items.pop();
            this.currentOperation = null;
            this.addMode = true;
          }
          if (this.items.length == 0 ) this.addMode = true;
          this.resultDone = false;
        }
      }
      break;
    }
    /******************** Обработка арифметических операций ***********************/
    case "+":
    case "-":
    case "/":
    case "*": {
      if (this.items.length > 0) {
        if (this.currentOperation === null) {
          if (this.resultDone) {
            computedStr.textContent = this.inputStr = resultStr.textContent;
            resultStr.style.cssText = `font-size: 1em;
                                       transition: .2s ease-in-out`;
          }
          this.addMode = true;
          correctInput(e.key);
          this.currentOperation = e.key;
          this.items.push(e.key);
          this.itemIndex++;
          this.upIndex = false;
          this.resultDone = false;
          this.constEdit = true;
        } 
        else {
          computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
          this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
          this.currentOperation = e.key;
          this.items[this.itemIndex] = e.key;
          correctInput(this.currentOperation);
        }
      }
      break;
    }
    /***************** Процент от числа ******************/
    case "%": {
      if(this.items.length > 0 &&
        this.currentOperation === null) {
        if (this.resultDone)
         {
          resultStr.style.cssText = `font-size: 1em;
          transition: .2s ease-in-out`;
          computedStr.textContent = this.inputStr = this.items[this.itemIndex];
         } 
              
        computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - this.items[this.itemIndex].length);
        this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
        this.items[this.itemIndex] = setRightValue(String(this.items[this.itemIndex] / 100));
        computedStr.textContent += this.items[this.itemIndex];
        this.inputStr += this.items[this.itemIndex];
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /**************** Десятичная точка ***************/
    case ".": {
      if (this.items.length != 0) {
        if (this.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                        transition: .2s ease-in-out`;
        if (!this.items[this.itemIndex].includes(".") && this.items[this.itemIndex].length > 0 && '*/-+'.indexOf(this.items[this.itemIndex]) == -1) {
          this.items[this.itemIndex] += e.key;
          computedStr.textContent += e.key;
          this.inputStr += e.key;
          resultStr.textContent = setRightValue(eval(this.inputStr));
        }
      }
      break;
    }
    /******************* Обработка результата (равно) ***********************/
    case "=":
    case "Enter": {
      if(this.currentOperation === null &&
         this.items.length > 0 &&
         this.inputStr.length > 0) {
        resultStr.textContent = setRightValue(eval(this.inputStr));
        resultStr.style.cssText = `font-size: 1.2em !important;
                                   transition: .2s ease-in-out`;
        this.currentOperation = null;
        this.items = [];
        this.items.push(resultStr.textContent);
        this.itemIndex = 0;
        this.resultDone = true;
      }
      break;
    }
    /********************** Сброс калькулятор (очистка) *****************************/
    case "Escape": {
      if (this.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                      transition: .2s ease-in-out`;
      computedStr.textContent = this.inputStr = "";
      resultStr.textContent = setRightValue(eval(this.inputStr));
      this.items = [];
      this.currentOperation = null;
      this.addMode = true;
      this.itemIndex = 0;
      this.upIndex = true;
      this.resultDone = false;
      this.sign = '+';
      break;
    }
    /************************** Экспонента ********************************/
    case "Shift" && "E": {
      if((this.currentOperation != null ||
          this.items.length == 0) &&
          this.extendMode) {
        this.items.push(exp.toString());

        if (!this.upIndex) {
          this.itemIndex++;
          this.upIndex = true;
        }

        this.currentOperation = null;

        correctInput(e.key);
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /************************* Число Пи ********************************/
    case "Shift" && "P": {
      if((this.currentOperation != null || this.items.length == 0) && 
          this.extendMode) {
        this.constEdit = false;
        this.items.push(pi.toString());

        if (!this.upIndex) {
          this.itemIndex++;
          this.upIndex = true;
        }

        this.currentOperation = null;

        correctInput(e.key);
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /**************************** Ln ***********************************/
    case "Shift" && "N": {
      if(this.items.length > 0 &&
         this.extendMode &&
        this.currentOperation === null) {
          if (this.resultDone)
          {
            resultStr.style.cssText = `font-size: 1.2em;
            transition: .2s ease-in-out`;
            computedStr.textContent = this.inputStr = this.items[this.itemIndex];
            this.resultDone = false;
          } 
        this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
        computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - this.items[this.itemIndex].length);
        this.items[this.itemIndex] = setRightValue(Math.log(this.items[this.itemIndex]));
        this.inputStr += this.items[this.itemIndex];
        computedStr.textContent += this.items[this.itemIndex];
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /**************************** Lg ***********************************/
    case "Shift" && "G": {
      if(this.items.length > 0 &&
         this.extendMode &&
         this.currentOperation === null) {
          if (this.resultDone)
          {
            resultStr.style.cssText = `font-size: 1.2em;
            transition: .2s ease-in-out`;
            computedStr.textContent = this.inputStr = this.items[this.itemIndex];
            this.resultDone = false;
          } 
        this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
        computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - this.items[this.itemIndex].length)
        this.items[this.itemIndex] = setRightValue(Math.log10(this.items[this.itemIndex]));
        this.inputStr += this.items[this.itemIndex];
        computedStr.textContent += this.items[this.itemIndex];
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /************* Смена знака ************/
    case "Shift" && "H": {
      if(this.items.length >= 0 &&
        this.extendMode &&
        this.currentOperation === null) {
          if (this.resultDone)
          {
            resultStr.style.cssText = `font-size: 1.2em;
            transition: .2s ease-in-out`;
            computedStr.textContent = this.inputStr = this.items[this.itemIndex];
            this.resultDone = false;
          } 
          if(this.items.length == 0) {
            this.items.push('-');
            computedStr.textContent += '-';
            this.inputStr += '-';
            this.addMode = false;
            this.sign = '-';
          }
          else {
            if(this.inputStr[this.inputStr.length - this.items[this.itemIndex].length - 2] == '(' &&
             this.inputStr[this.inputStr.length - 1] == ')' &&
             this.items[this.itemIndex][0] == '-' &&
             this.items.length > 1) {
              computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - String(this.items[this.itemIndex]).length - 2);
              this.inputStr = this.inputStr.substring(0, this.inputStr.length - String(this.items[this.itemIndex]).length - 2);
              this.items[this.itemIndex] = String(-this.items[this.itemIndex]);
              computedStr.textContent += this.items[this.itemIndex];
              this.inputStr += this.items[this.itemIndex];
            }
            else {
              if(this.items.length > 1) {
                computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - String(this.items[this.itemIndex]).length);
                this.inputStr = this.inputStr.substring(0, this.inputStr.length - String(this.items[this.itemIndex]).length);
                this.items[this.itemIndex] = String(-this.items[this.itemIndex]);
                computedStr.textContent += `(${this.items[this.itemIndex]})`;
                this.inputStr += `(${this.items[this.itemIndex]})`;
              }
              else {
                computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - String(this.items[this.itemIndex]).length);
                this.inputStr = this.inputStr.substring(0, this.inputStr.length - String(this.items[this.itemIndex]).length);
                this.items[this.itemIndex] = String(-this.items[this.itemIndex]);
                computedStr.textContent += this.items[this.itemIndex];
                this.inputStr += this.items[this.itemIndex];
              }
            }
            resultStr.textContent = setRightValue(eval(this.inputStr));
          }
        }
      break;
    }
    /******************* Возведение в степень *******************/
    case "Shift" && "D": {
      if (this.items.length > 0 &&
          this.extendMode) {
        if (this.currentOperation === null) {
          if (this.resultDone)
          {
            resultStr.style.cssText = `font-size: 1.2em;
            transition: .2s ease-in-out`;
            computedStr.textContent = this.inputStr = this.items[this.itemIndex];
            this.resultDone = false;
          } 
          this.addMode = true;
          correctInput(e.key);
          this.currentOperation = "**";
          this.items.push('**');
          this.itemIndex++;
          this.upIndex = false;
          this.resultDone = false;
        } 
        else {
          computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
          this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
          this.currentOperation = '**';
          this.items[this.itemIndex] = '**';
          correctInput(e.key);
        }
      }
      break;
    }
    /******************* Корень число *******************/
    case "Shift" && "B": {
      if(this.items.length > 0 &&
        this.extendMode &&
        this.currentOperation === null) {
          if (this.resultDone)
          {
            resultStr.style.cssText = `font-size: 1.2em;
            transition: .2s ease-in-out`;
            computedStr.textContent = this.inputStr = this.items[this.itemIndex];
            this.resultDone = false;
          } 
        this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
        computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - this.items[this.itemIndex].length)
        this.items[this.itemIndex] = setRightValue(Math.sqrt(this.items[this.itemIndex]));
        this.inputStr += this.items[this.itemIndex];
        computedStr.textContent += this.items[this.itemIndex];
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /******************* Факториал *******************/
    case "Shift" && "W": {
      if(this.items.length > 0 &&
        this.extendMode &&
        this.currentOperation === null) {
          if (this.resultDone)
          {
            resultStr.style.cssText = `font-size: 1.2em;
            transition: .2s ease-in-out`;
            computedStr.textContent = this.inputStr = this.items[this.itemIndex];
            this.resultDone = false;
          } 
        this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
        computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - this.items[this.itemIndex].length)
        this.items[this.itemIndex] = setRightValue(factorial(this.items[this.itemIndex]));
        this.inputStr += this.items[this.itemIndex];
        computedStr.textContent += this.items[this.itemIndex];
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
    /******************* Степень (-1) *******************/
    case "Shift" && "T": {
      if(this.items.length > 0 &&
        this.extendMode &&
        this.currentOperation === null) {
          if (this.resultDone)
          {
           resultStr.style.cssText = `font-size: 1.2em;
           transition: .2s ease-in-out`;
           computedStr.textContent = this.inputStr = this.items[this.itemIndex];
           this.resultDone = false;
          } 
        this.inputStr = this.inputStr.substring(0, this.inputStr.length - this.items[this.itemIndex].length);
        computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - this.items[this.itemIndex].length)
        this.items[this.itemIndex] = setRightValue(this.items[this.itemIndex]**(-1));
        this.inputStr += this.items[this.itemIndex];
        computedStr.textContent += this.items[this.itemIndex];
        resultStr.textContent = setRightValue(eval(this.inputStr));
      }
      break;
    }
  }
  controlSign();
  checkEmptiness();
  controlFontSize();
  controlZero();
}
/******************* Обработка кликов по кнопкам ******************/
calcBtns.forEach(item => {
  item.addEventListener('click', function() {
    if (Calc.resultDone) {
      Calc.inputStr = computedStr.textContent = item.textContent;
      resultStr.textContent = setRightValue(eval(Calc.inputStr));
      Calc.resultDone = false;
      Calc.addMode = false;
    } 
    else {
      if (Calc.items.length == 0 || String(Calc.items[Calc.itemIndex]).length <= 15) {
        if(Calc.constEdit) {
          Calc.inputStr += item.textContent;
          computedStr.textContent += item.textContent;
          resultStr.textContent = setRightValue(eval(Calc.inputStr));
        }
      }
    }
    if (Calc.addMode) {
      if(Calc.constEdit) {
        Calc.items.push(item.textContent);
        Calc.addMode = false;
        Calc.currentOperation = null;

        if (!Calc.upIndex) {
          Calc.itemIndex++;
          Calc.upIndex = true;
        }
      }
    } 
    else {
      if(Calc.constEdit) {
        if (String(Calc.items[Calc.itemIndex]).length <= 15) Calc.items[Calc.itemIndex] += item.textContent;
      }
    }
    checkEmptiness();
    controlZero();
    controlFontSize();
  })
})
operationBtns.forEach(item => {
  item.addEventListener('click', function() {
    switch(item.textContent) {
      case '%': {
        if(Calc.items.length > 0 &&
          Calc.currentOperation === null) {
          if (Calc.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                          transition: .2s ease-in-out`;
          computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length);
          Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
          Calc.items[Calc.itemIndex] = setRightValue(String(Calc.items[Calc.itemIndex] / 100));
          computedStr.textContent += Calc.items[Calc.itemIndex];
          Calc.inputStr += Calc.items[Calc.itemIndex];
          resultStr.textContent = setRightValue(eval(Calc.inputStr));
        }
        break;
      }
      case '÷': {
        if (Calc.items.length > 0) {
          if (Calc.currentOperation === null) {
            if (Calc.resultDone) {
              computedStr.textContent = Calc.inputStr = resultStr.textContent;
              resultStr.style.cssText = `font-size: 1em;
                                         transition: .2s ease-in-out`;
            }
            Calc.addMode = true;
            Calc.inputStr += '/';
            computedStr.textContent += item.textContent;
            Calc.currentOperation = '/';
            Calc.items.push('/');
            Calc.itemIndex++;
            Calc.upIndex = false;
            Calc.resultDone = false;
            Calc.constEdit = true;
          } 
          else {
            computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
            Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
            Calc.currentOperation = "/";
            Calc.items[Calc.itemIndex] = "/";
            computedStr.textContent += item.textContent;
            Calc.inputStr += '/';
            Calc.currentOperation = '/';
          }
        }        
        break;      
      }
      case '×': {
        if (Calc.items.length > 0) {
          if (Calc.currentOperation === null) {
            if (Calc.resultDone) {
              computedStr.textContent = Calc.inputStr = resultStr.textContent;
              resultStr.style.cssText = `font-size: 1em;
                                         transition: .2s ease-in-out`;
            }
            Calc.addMode = true;
            Calc.inputStr += '*';
            computedStr.textContent += item.textContent;
            Calc.currentOperation = '*';
            Calc.items.push('*');
            Calc.itemIndex++;
            Calc.upIndex = false;
            Calc.resultDone = false;
            Calc.constEdit = true;
          } 
          else {
            computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
            Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
            Calc.currentOperation = "*";
            Calc.items[Calc.itemIndex] = "*";
            computedStr.textContent += item.textContent;
            Calc.inputStr += '*';
            Calc.currentOperation = '*';
          }
        }               
        break;
      }
      case '-': {
        if (Calc.items.length > 0) {
          if (Calc.currentOperation === null) {
            if (Calc.resultDone) {
              computedStr.textContent = Calc.inputStr = resultStr.textContent;
              resultStr.style.cssText = `font-size: 1em;
                                         transition: .2s ease-in-out`;
            }
            Calc.addMode = true;
            Calc.inputStr += '-';
            computedStr.textContent += item.textContent;
            Calc.currentOperation = '-';
            Calc.items.push('-');
            Calc.itemIndex++;
            Calc.upIndex = false;
            Calc.resultDone = false;
            Calc.constEdit = true;
          } 
          else {
            computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
            Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
            Calc.currentOperation = "-";
            Calc.items[Calc.itemIndex] = "-";
            computedStr.textContent += item.textContent;
            Calc.inputStr += '-';
            Calc.currentOperation = '-';
          }
        }                       
        break;
      }
      case '+': {   
        if (Calc.items.length > 0) {
          if (Calc.currentOperation === null) {
            if (Calc.resultDone) {
              computedStr.textContent = Calc.inputStr = resultStr.textContent;
              resultStr.style.cssText = `font-size: 1em;
                                         transition: .2s ease-in-out`;
            }
            Calc.addMode = true;
            Calc.inputStr += '+';
            computedStr.textContent += item.textContent;
            Calc.currentOperation = '+';
            Calc.items.push('+');
            Calc.itemIndex++;
            Calc.upIndex = false;
            Calc.resultDone = false;
            Calc.constEdit = true;
          } 
          else {
            computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
            Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
            Calc.currentOperation = "+";
            Calc.items[Calc.itemIndex] = "+";
            computedStr.textContent += item.textContent;
            Calc.inputStr += '+';
            Calc.currentOperation = '+';
          }
        }                           
        break;
      }
      case '.': {
        if (Calc.items.length != 0) {
          if (Calc.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                          transition: .2s ease-in-out`;
          if (!Calc.items[Calc.itemIndex].includes(".") && Calc.items[Calc.itemIndex].length > 0 && '*/-+'.indexOf(Calc.items[Calc.itemIndex]) == -1) {
            Calc.items[Calc.itemIndex] += item.textContent;
            computedStr.textContent += item.textContent;
            Calc.inputStr += item.textContent;
            resultStr.textContent = setRightValue(eval(Calc.inputStr));
          }
        }
        break;
      }
    }
  })
  controlZero();
  controlFontSize();
})
deleteBtn.addEventListener('click', function() {
  if (computedStr.textContent.length != 0 &&
    resultStr.textContent.length != 0 &&
    Calc.inputStr.length != 0) {
  let opStr = "**, +, -, /, *";

  if (!Calc.resultDone) {
    computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);

    if(Calc.items[Calc.itemIndex] == exp || Calc.items[Calc.itemIndex] == pi || Calc.items[Calc.itemIndex] == '**') {
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
    }
    else {
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - 1);
    }

    if (Calc.items[Calc.itemIndex] == "+" ||
        Calc.items[Calc.itemIndex] == "-" ||
        Calc.items[Calc.itemIndex] == "/" ||
        Calc.items[Calc.itemIndex] == "*" ||
        Calc.items[Calc.itemIndex] == "**") {
          Calc.currentOperation = null;
          Calc.addMode = false;
    }

    if(Calc.items[Calc.itemIndex] == exp ||
      Calc.items[Calc.itemIndex] == pi) {
        Calc.addMode = true;
    }

    if(Calc.items[Calc.itemIndex] == exp ||
      Calc.items[Calc.itemIndex] == pi ||
      Calc.items[Calc.itemIndex] == "**") {
        Calc.items[Calc.itemIndex] = "";
        Calc.constEdit = true;
    }
    else {
      Calc.items[Calc.itemIndex] = Calc.items[Calc.itemIndex].substring(0, Calc.items[Calc.itemIndex].length - 1);
    }

    if (Calc.items[Calc.itemIndex] == "" &&
    Calc.items.length != 1) {
      Calc.itemIndex--;
      Calc.items.pop();
    }

    if(Calc.items[Calc.itemIndex] == pi || Calc.items[Calc.itemIndex] == exp) Calc.constEdit = false;

    opStr.split(", ").forEach((item) => {
      if (item == Calc.items[Calc.itemIndex]) {
        Calc.currentOperation = item;
        resultStr.textContent = setRightValue(eval(Calc.items.slice(0, Calc.items.length - 1).join("")));
      }
    });

    if (Calc.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                    transition: .2s ease-in-out`;

    if (opStr.split(", ").indexOf(Calc.items[Calc.itemIndex]) != -1 &&
    Calc.items.length == 1) {
      Calc.items.pop();
      Calc.currentOperation = null;
      Calc.addMode = true;
    }

    if (Calc.items.length == 0 ||
      Calc.items[0] == '') {
      (Calc.items.length > 0) ? Calc.items.pop() : '';
      Calc.constEdit = true;
      Calc.addMode = true;
      computedStr.textContent = Calc.inputStr = "";
      resultStr.textContent = setRightValue(eval(Calc.inputStr));
    }

    if (opStr.split(', ').indexOf(Calc.items[Calc.itemIndex]) == -1) resultStr.textContent = setRightValue(eval(Calc.inputStr));
  }
    else {
    computedStr.textContent = Calc.inputStr = resultStr.textContent;
    computedStr.textContent = Calc.inputStr = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
    Calc.items[Calc.itemIndex] = Calc.items[Calc.itemIndex].substring(0, Calc.items[Calc.itemIndex].length - 1);
    if (Calc.items[Calc.itemIndex] == "" &&
    Calc.items.length != 1) {
      Calc.itemIndex--;
      Calc.items.pop();
    }
    if (opStr.split(', ').indexOf(Calc.items[Calc.itemIndex]) == -1) resultStr.textContent = setRightValue(eval(Calc.inputStr));
    
    if (Calc.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                    transition: .2s ease-in-out`;
    if (opStr.split(', ').indexOf(Calc.items[Calc.itemIndex]) != -1 &&
    Calc.items.length == 1) {
      Calc.items.pop();
      Calc.currentOperation = null;
      Calc.addMode = true;
    }
    if (Calc.items.length == 0 ) Calc.addMode = true;
    Calc.resultDone = false;
  }
}
checkEmptiness();
controlZero();
controlFontSize();
})
clearBtn.addEventListener('click', function() {
  if (Calc.resultDone) resultStr.style.cssText = `font-size: 1em;
                                                      transition: .2s ease-in-out`;
      computedStr.textContent = Calc.inputStr = "";
      resultStr.textContent = setRightValue(eval(Calc.inputStr));
      Calc.items = [];
      Calc.currentOperation = null;
      Calc.addMode = true;
      Calc.itemIndex = 0;
      Calc.upIndex = true;
      Calc.resultDone = false;
      checkEmptiness();
      controlFontSize();
})
resultBtn.addEventListener('click', function() {
  if(Calc.currentOperation === null &&
    Calc.items.length > 0 &&
    Calc.inputStr.length > 0) {
   resultStr.textContent = setRightValue(eval(Calc.inputStr));
   resultStr.style.cssText = `font-size: 1.2em !important;
                              transition: .2s ease-in-out`;
                              Calc.currentOperation = null;
                              Calc.items = [];
                              Calc.items.push(resultStr.textContent);
                              Calc.itemIndex = 0;
                              Calc.resultDone = true;
 }
})
extendBtn.addEventListener('click', function() {
  if(!Calc.extendMode) {
    extendBtn.innerHTML = exitBtn;
    additionalBtns.forEach(item => {
      item.style.cssText = `display: block;`;
    }) 
    calcGrid.style.cssText = `display: grid;
                              grid-template-columns: repeat(5, 1fr);
                              grid-template-rows: repeat(6, 53px);`;
    Calc.extendMode = true;
  }
  else {
    extendBtn.innerHTML = expandBtn;
    additionalBtns.forEach(item => {
      item.style.cssText = null;
    })
    calcGrid.style.cssText = null;
    Calc.extendMode = false;
  }
})
piBtn.addEventListener('click', function() {
  if((Calc.currentOperation != null || Calc.items.length == 0) && 
  Calc.extendMode) {
    Calc.constEdit = false;
    Calc.items.push(pi.toString());

if (!Calc.upIndex) {
  Calc.itemIndex++;
  Calc.upIndex = true;
}

Calc.currentOperation = null;

computedStr.textContent += 'π';
Calc.inputStr += pi;
resultStr.textContent = setRightValue(eval(Calc.inputStr));
}
checkEmptiness();
controlFontSize();
})
expBtn.addEventListener('click', function() {
  if((Calc.currentOperation != null ||
    Calc.items.length == 0) &&
    Calc.extendMode) {
  Calc.items.push(exp.toString());

  if (!Calc.upIndex) {
    Calc.itemIndex++;
    Calc.upIndex = true;
  }

  Calc.currentOperation = null;

  computedStr.textContent += 'e';
  Calc.inputStr += exp;
  resultStr.textContent = setRightValue(eval(Calc.inputStr));
}
checkEmptiness();
controlFontSize();
})
negDegreeBtn.addEventListener('click', function() {
  if(Calc.items.length > 0 &&
    Calc.extendMode &&
    Calc.currentOperation === null) {
      if (Calc.resultDone)
      {
        resultStr.style.cssText = `font-size: 1.2em;
        transition: .2s ease-in-out`;
        computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
        Calc.resultDone = false;
      } 
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
    computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length)
    Calc.items[Calc.itemIndex] = setRightValue(Calc.items[Calc.itemIndex]**(-1));
    Calc.inputStr += Calc.items[Calc.itemIndex];
    computedStr.textContent += Calc.items[Calc.itemIndex];
    resultStr.textContent = setRightValue(eval(Calc.inputStr));
  }
})
radicalBtn.addEventListener('click', function() {
  if(Calc.items.length > 0 &&
    Calc.extendMode &&
    Calc.currentOperation === null) {
      if (Calc.resultDone)
      {
        resultStr.style.cssText = `font-size: 1.2em;
        transition: .2s ease-in-out`;
        computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
        Calc.resultDone = false;
      } 
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
    computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length)
    Calc.items[Calc.itemIndex] = setRightValue(factorial(Calc.items[Calc.itemIndex]));
    Calc.inputStr += Calc.items[Calc.itemIndex];
    computedStr.textContent += Calc.items[Calc.itemIndex];
    resultStr.textContent = setRightValue(eval(Calc.inputStr));
  }
})
rootBtn.addEventListener('click', function() {
  if(Calc.items.length > 0 &&
    Calc.extendMode &&
    Calc.currentOperation === null) {
      if (Calc.resultDone)
      {
        resultStr.style.cssText = `font-size: 1.2em;
        transition: .2s ease-in-out`;
        computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
        Calc.resultDone = false;
      } 
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
    computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length)
    Calc.items[Calc.itemIndex] = setRightValue(Math.sqrt(Calc.items[Calc.itemIndex]));
    Calc.inputStr += Calc.items[Calc.itemIndex];
    computedStr.textContent += Calc.items[Calc.itemIndex];
    resultStr.textContent = setRightValue(eval(Calc.inputStr));
  }
})
degreeBtn.addEventListener('click', function() {
  if (Calc.items.length > 0 &&
    Calc.extendMode) {
  if (Calc.currentOperation === null) {
    if (Calc.resultDone)
    {
      resultStr.style.cssText = `font-size: 1.2em;
      transition: .2s ease-in-out`;
      computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
      Calc.resultDone = false;
    } 
    Calc.addMode = true;
    computedStr.textContent += '^';
    Calc.inputStr += '**';
    Calc.currentOperation = "**";
    Calc.items.push('**');
    Calc.itemIndex++;
    Calc.upIndex = false;
    Calc.resultDone = false;
  } 
  else {
    computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - 1);
    Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
    Calc.currentOperation = '**';
    Calc.items[Calc.itemIndex] = '**';
    computedStr.textContent += '^';
    Calc.inputStr += '**';
  }
}
})
lgBtn.addEventListener('click', function() {
  if(Calc.items.length > 0 &&
    Calc.extendMode &&
    Calc.currentOperation === null) {
      if (Calc.resultDone)
      {
        resultStr.style.cssText = `font-size: 1.2em;
        transition: .2s ease-in-out`;
        computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
        Calc.resultDone = false;
      } 
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
   computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length)
   Calc.items[Calc.itemIndex] = setRightValue(Math.log10(Calc.items[Calc.itemIndex]));
   Calc.inputStr += Calc.items[Calc.itemIndex];
   computedStr.textContent += Calc.items[Calc.itemIndex];
   resultStr.textContent = setRightValue(eval(Calc.inputStr));
 }
 controlFontSize();
})
lnBtn.addEventListener('click', function() {
  if(Calc.items.length > 0 &&
    Calc.extendMode &&
    Calc.currentOperation === null) {
      if (Calc.resultDone)
      {
        resultStr.style.cssText = `font-size: 1.2em;
        transition: .2s ease-in-out`;
        computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
        Calc.resultDone = false;
      } 
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);
   computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length);
   Calc.items[Calc.itemIndex] = setRightValue(Math.log(Calc.items[Calc.itemIndex]));
   Calc.inputStr += Calc.items[Calc.itemIndex];
   computedStr.textContent += Calc.items[Calc.itemIndex];
   resultStr.textContent = setRightValue(eval(Calc.inputStr));
 }
 controlFontSize();
})
changeSignBtn.addEventListener('click', function() {
  if(Calc.items.length >= 0 &&
    Calc.extendMode &&
    Calc.currentOperation === null) {
      if (Calc.resultDone)
      {
        resultStr.style.cssText = `font-size: 1.2em;
        transition: .2s ease-in-out`;
        computedStr.textContent = Calc.inputStr = Calc.items[Calc.itemIndex];
        Calc.resultDone = false;
      } 
      if(Calc.items.length == 0) {
        Calc.items.push('-');
        computedStr.textContent += '-';
        Calc.inputStr += '-';
        Calc.addMode = false;
        Calc.sign = '-';
      }
      else {
        if(Calc.inputStr[Calc.inputStr.length - Calc.items[Calc.itemIndex].length - 2] == '(' &&
        Calc.inputStr[Calc.inputStr.length - 1] == ')' &&
        Calc.items[Calc.itemIndex][0] == '-' &&
        Calc.items.length > 1) {
          computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - String(Calc.items[Calc.itemIndex]).length - 2);
          Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - String(Calc.items[Calc.itemIndex]).length - 2);
          Calc.items[Calc.itemIndex] = String(-Calc.items[Calc.itemIndex]);
          computedStr.textContent += Calc.items[Calc.itemIndex];
          Calc.inputStr += Calc.items[Calc.itemIndex];
        }
        else {
          if(Calc.items.length > 1) {
            computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - String(Calc.items[Calc.itemIndex]).length);
            Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - String(Calc.items[Calc.itemIndex]).length);
            Calc.items[Calc.itemIndex] = String(-Calc.items[Calc.itemIndex]);
            computedStr.textContent += `(${Calc.items[Calc.itemIndex]})`;
            Calc.inputStr += `(${Calc.items[Calc.itemIndex]})`;
          }
          else {
            computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - String(Calc.items[Calc.itemIndex]).length);
            Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - String(Calc.items[Calc.itemIndex]).length);
            Calc.items[Calc.itemIndex] = String(-Calc.items[Calc.itemIndex]);
            computedStr.textContent += Calc.items[Calc.itemIndex];
            Calc.inputStr += Calc.items[Calc.itemIndex];
          }
        }
        resultStr.textContent = setRightValue(eval(Calc.inputStr));
      }
    }
})
toggler.addEventListener('click', function() {
  if(checkbox.checked) {
    checkbox.checked = false;
    toggler.style.cssText = `transform: translateX(-1px)`;
  }
  else {
    checkbox.checked = true;
    toggler.style.cssText = `transform: translateX(19px)`;
  }
  setState();
})
shapeArrow.addEventListener('click', function() {
  
})
colorArrow.addEventListener('click', function() {

})
/********************* Событие нажатия клавиши **************/
document.addEventListener("keydown", function (e) {
  if (
    vldBtnStr.indexOf(e.key) !== -1 ||
    e.key == "Backspace" ||
    e.key == "Delete" ||
    e.key == "." ||
    e.key == "Enter" ||
    e.key == "Escape" ||
    e.key == "Shift" ||
    e.key == "R" ||
    e.key == "E" ||
    e.key == "P" ||
    e.key == "N" ||
    e.key == "G" ||
    e.key == "D" ||
    e.key == "W" ||
    e.key == "T" ||
    e.key == "B" ||
    e.key == "H"
  ) {
    let getInput = calc.bind(Calc);
    getInput(e);
    calcBtns.forEach((item) => {
      if (e.key == item.textContent) {
        item.style.cssText = activeBtn;
      }
    });
    switch (e.key) {
      case "Delete":
      case "Backspace": {
        deleteBtn.style.cssText = activeBtn;
        break;
      }
      case "Escape": {
        clearBtn.style.cssText = activeBtn;
        break;
      }
      case "Enter":
      case "=": {
        resultBtn.style.cssText = activeBtn;
        break;
      }
      case ".": {
        dotBtn.style.cssText = activeBtn;
        break;
      }
      case "+": {
        plusBtn.style.cssText = activeBtn;
        break;
      }
      case "-": {
        minusBtn.style.cssText = activeBtn;
        break;
      }
      case "/": {
        divideBtn.style.cssText = activeBtn;
        break;
      }
      case "*": {
        multiplyBtn.style.cssText = activeBtn;
        break;
      }
      case "%": {
        percentBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "H": {
        changeSignBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "R":  {
        extendBtn.style.cssText = activeBtn;
        if(!Calc.extendMode) {
          extendBtn.innerHTML = exitBtn;
          additionalBtns.forEach(item => {
            item.style.cssText = `display: block;`;
          }) 
          calcGrid.style.cssText = `display: grid;
                                    grid-template-columns: repeat(5, 1fr);
                                    grid-template-rows: repeat(6, 53px);`;
          Calc.extendMode = true;
        }
        else {
          extendBtn.innerHTML = expandBtn;
          additionalBtns.forEach(item => {
            item.style.cssText = null;
          })
          calcGrid.style.cssText = null;
          Calc.extendMode = false;
        }
        break;
      }
      case "Shift" && "E": {
        expBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "P": {
        piBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "N": {
        lnBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "G": {
        lgBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "D": {
        degreeBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "B": {
        rootBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "W": {
        radicalBtn.style.cssText = activeBtn;
        break;
      }
      case "Shift" && "T": {
        negDegreeBtn.style.cssText = activeBtn;
        break;
      }
      default: {
        break;
      }
    }
  }
});
/********************* Событие поднятия клавиши **************/
document.addEventListener("keyup", function (e) {
  if (
    vldBtnStr.indexOf(e.key) !== -1 ||
    e.key == "Backspace" ||
    e.key == "Delete" ||
    e.key == "." ||
    e.key == "Enter" ||
    e.key == "Escape" ||
    e.key == "Shift" ||
    e.key == "P" ||
    e.key == "E" ||
    e.key == "R" ||
    e.key == "N" ||
    e.key == "G" ||
    e.key == "D" ||
    e.key == "W" ||
    e.key == "T" ||
    e.key == "B" || 
    e.key == "H"
  ) {
    calcBtns.forEach((item) => {
      if (e.key == item.textContent) {
        item.style.cssText = null;
      }
    });
    switch (e.key) {
      case "Delete":
      case "Backspace": {
        deleteBtn.style.cssText = null;
        break;
      }
      case "Escape": {
        clearBtn.style.cssText = null;
        break;
      }
      case "Enter":
      case "=": {
        resultBtn.style.cssText = null;
        break;
      }
      case ".": {
        dotBtn.style.cssText = null;
        break;
      }
      case "+": {
        plusBtn.style.cssText = null;
        break;
      }
      case "-": {
        minusBtn.style.cssText = null;
        break;
      }
      case "/": {
        divideBtn.style.cssText = null;
        break;
      }
      case "*": {
        multiplyBtn.style.cssText = null;
        break;
      }
      case "%": {
        percentBtn.style.cssText = null;
        break;
      }      
      case "Shift" && "H": {
        changeSignBtn.style.cssText = null;
        break;
      }
      case "Shift" && "R": {
        extendBtn.style.cssText = null;
        break;
      }
      case "Shift" && "E": {
        expBtn.style.cssText = null;
        break;
      }
      case "Shift" && "P": {
        piBtn.style.cssText = null;
        break;
      }
      case "Shift" && "N": {
        lnBtn.style.cssText = null;
        break;
      }
      case "Shift" && "G": {
        lgBtn.style.cssText = null;
        break;
      }
      case "Shift" && "D": {
        degreeBtn.style.cssText = null;
        break;
      }
      case "Shift" && "B": {
        rootBtn.style.cssText = null;
        break;
      }
      case "Shift" && "W": {
        radicalBtn.style.cssText = null;
        break;
      }
      case "Shift" && "T": {
        negDegreeBtn.style.cssText = null;
        break;
      }
      default: {
        break;
      }
    }
  }
});
/****************** Устранение погрешности в JS ******************/
function setRightValue(value) {
  value = (typeof(value) === 'undefined') ? '' : String(value);
  if(value != '') {
    if(value.includes('.')) {
        let strAfterDot = value.split('.')[1];
        let indexOfExp = strAfterDot.split('').reverse().join('').indexOf('e');
        let expressionWithExp = '';
        if (indexOfExp != -1) {
          expressionWithExp = strAfterDot.slice(-(indexOfExp + 1));
          strAfterDot = strAfterDot.substring(0, strAfterDot.length - expressionWithExp.length);
        }
        let numArray = "123456789";
        let arrayOfIndexes = [];
        let indexForFix = 0;

        numArray.split('').forEach(item => {
          (strAfterDot.length > 17) ?
            indexForFix = strAfterDot.substring(0, strAfterDot.length - 1).lastIndexOf(item) :
            indexForFix = strAfterDot.lastIndexOf(item);
          arrayOfIndexes.push(indexForFix);
        })
        if(Math.max(...arrayOfIndexes) >= 9 && numArray.indexOf(strAfterDot[strAfterDot.length - 2]) == -1) {
          let rightValue = (+(String(value).substring(0, (String(value).length) - expressionWithExp.length))).toFixed(9);
          strAfterDot = rightValue.split('.')[1];
          return (strAfterDot[strAfterDot.length - 1] == '0') ?
            setRightValue(rightValue + expressionWithExp) :
            rightValue + expressionWithExp;
        }
        else {
          let rightValue = (+(String(value).substring(0, (String(value).length) - expressionWithExp.length))).toFixed(Math.max(...arrayOfIndexes) + 1);
          strAfterDot = rightValue.split('.')[1];
          return (strAfterDot[strAfterDot.length - 1] == '0') ? 
            setRightValue(rightValue + expressionWithExp) : 
            rightValue + expressionWithExp;
        }
    }
    else {
      return value;
    }
  } 
  else {
    return '';
  }
}
/**************** Проверка на пустоту дисплея **************/
function checkEmptiness() {
  computedStr.textContent == '' ? clearBtn.innerHTML = emptyDisplayBtn : clearBtn.innerHTML = smthOnDisplayBtn;
  if(Calc.items.length > 0) {
    equalSign.classList.contains('visible') ? '' : toggleVisibility();
  }
  else {
    equalSign.classList.contains('visible') ? toggleVisibility() : '';
  }
}
/************************ Менять видимость ************************/
function toggleVisibility() {
  equalSign.classList.toggle("visible");
}
/******************** Котроль размера шрифта ***********************/
function controlFontSize() {
  if(!Calc.resultDone) {
    if (computedStr.textContent.length > 16) {
      computedStr.style.cssText = `font-size: .8em !important;
      transition: all .2s ease-in-out`;
    } else if (computedStr.textContent.length > 24) {
      computedStr.style.cssText = `font-size: .7em !important;
      transition: all .2s ease-in-out`;
    } else {
      computedStr.style.cssText = `font-size: 1.1em !important;
      transition: all .2s ease-in-out`;
    }
  
    if (resultStr.textContent.length > 18) {
      resultStr.style.cssText = `font-size: .8em !important;
      transition: all .2s ease-in-out`;
    } else if (resultStr.textContent.length > 24) {
      resultStr.style.cssText = `font-size: .7em !important;
      transition: all .2s ease-in-out`;
    }  else {
      resultStr.style.cssText = `font-size: 1.1em !important;
      transition: all .2s ease-in-out`;
    }
  } 
}
/********************* Разделение на бэк и фронт ******************/
function correctInput(value) {
  switch(value) {
    case '+': {
      computedStr.textContent += value; 
      Calc.inputStr += value;
      break;
    }
    case '-': {
      computedStr.textContent += value;
      Calc.inputStr += value;
      break;
    }
    case '*': {
      computedStr.textContent += '×';
      Calc.inputStr += value;
      break;
    }
    case '/': {
      computedStr.textContent += '÷';
      Calc.inputStr += value;
      break;
    }
    case 'Shift' && 'E': {
      computedStr.textContent += 'e';
      Calc.inputStr += exp;
      break;
    }
    case 'Shift' && 'P': {
      computedStr.textContent += 'π';
      Calc.inputStr += pi;
      break;
    }
    case 'Shift' && 'D': {
      computedStr.textContent += '^';
      Calc.inputStr += '**';
    }
    default: {
      break;
    }
  }
}
/**************************** Факториал **************************/
function factorial(value) {
  if(value == 1) {
    return value;
  }
  else {
    return value * factorial(value - 1);
  }
}
/**************** Котроль нолей перед числами ****************/
function controlZero() {
  if(Calc.items.length != 0 &&
     !String(Calc.items[Calc.itemIndex]).includes('.') &&
     String(Calc.items[Calc.itemIndex])[0] == '0') {
       let index = 0;
       let array = Calc.items[Calc.itemIndex].split('');
       for (let i = 0; i < array.length; i++) {
        if(array[i] != '0') {
          break;
        }
        index++;
       }
      computedStr.textContent = computedStr.textContent.substring(0, computedStr.textContent.length - Calc.items[Calc.itemIndex].length);
      Calc.inputStr = Calc.inputStr.substring(0, Calc.inputStr.length - Calc.items[Calc.itemIndex].length);

      Calc.items[Calc.itemIndex] = Calc.items[Calc.itemIndex].substring(index, Calc.items[Calc.itemIndex].length);

       if(Calc.items[Calc.itemIndex] == '') {
         Calc.items[Calc.itemIndex] = "0";
       }
        computedStr.textContent += Calc.items[Calc.itemIndex];
        Calc.inputStr += Calc.items[Calc.itemIndex];
        resultStr.textContent = setRightValue(eval(Calc.inputStr));
     }
}
/************ Контроль за знаком ******************/
function controlSign() {
  if(Calc.items.length > 0) {
    Calc.sign = (Calc.items[Calc.itemIndex].length > 1 && Calc.items[Calc.itemIndex][0] == '-') ? '-' : '+';
  }
}
/*************** Контроль инструкции ***************/
function setState() {
  if(checkbox.checked) {
    instruction.style.cssText = `opacity: 1 !important;`;
  }
  else {
    instruction.style.cssText = `opacity: 0 !important;`;
  }
}

