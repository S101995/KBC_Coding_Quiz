let profilePic = document.getElementById('profile_pic');
        let inputFile = document.getElementById('inputFile');

        inputFile.onchange = function () {
            profilePic.src = URL.createObjectURL(inputFile.files[0])
        };



        let captcha;
        function generateCaptcha() {

            captcha = ''
            let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            for (var i = 1; i <= 6; i++) {
                captcha += string.charAt(Math.floor(Math.random() * string.length));
            }
            document.getElementById('displayCaptcha').innerHTML = `<del>${captcha}</del>`;
            // alert(captcha)
        }

        function captchaValidation() {
            let captchaInput = document.getElementById('captchaInput').value;
            let submitButton = document.getElementById('submitBtn');


            if (captcha === captchaInput) {
                return true;
            }
            else {
                generateCaptcha()
                document.getElementById('captchaInput').value = '';
                document.getElementById('captchaError').innerText = 'Enterd Captcha is Invalid Please Try Again !!!'
                submitButton.disabled = true;
                
                return false;
            }

            // return captchaResult;    

        };
        window.onload = generateCaptcha()

        function validation() {
            let submitButton = document.getElementById('submitBtn');
            let genderResult = false;
            let hobbyResult = false;


            let profile = document.getElementById('inputFile').value;

            let name = document.getElementById('name').value;
            let num = document.getElementById('num').value;
            let email = document.getElementById('email').value;
            let dob = document.getElementById('dob').value;
            let state = document.getElementById('state').value;
            let city = document.getElementById('city').value;
            let captchaInput = document.getElementById('captchaInput').value;


            let gender = document.getElementsByName('gender');
            for (var i = 0; i < gender.length; i++) {
                if (gender[i].checked) {
                    genderResult = true
                    break;
                }
            }

            let hobby = document.getElementsByName('hobby');
            for (var i = 0; i < hobby.length; i++) {
                if (hobby[i].checked) {
                    hobbyResult = true
                    break;
                }
            }
            document.getElementById('captchaError').innerText='';

            submitButton.disabled = !(name && num.length === 10 && email && dob && state &&
                city && profile && genderResult && captchaInput.length === 6 && hobbyResult);
        };

       function onlyalphabet(e){
        let asciiValue = e.which || e.keycode;
        if ( (asciiValue >= 65 && asciiValue <= 90) || (asciiValue >=97 && asciiValue <= 122) || asciiValue === 32)
        {
            return true;
        }else{
            e.preventDefault()
        }
       }
       function onlyNumeric(e){
        let asciiValue = e.which || e.keycode;
        if ( asciiValue >= 48 && asciiValue <=56)
        {
            return true;
        }else{
            e.preventDefault()
        }
       }

       function formNamePrint(){
        let name = document.getElementById('name').value;
         document.getElementById('formName').innerText=name;
       }

       window.onload= function(){
        formNamePrint();
       }