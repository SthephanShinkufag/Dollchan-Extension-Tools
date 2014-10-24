var response;
var recaptcha_challenge_field;
var captcha_url;
var recaptcha_response_field;
    function addFile_captcha(url) {//Тут получаем из гугла файл с переменной, из которой берем recaptcha_challenge_field
        $.getScript(url, function (data) {
            console.log("Load was performed.");
        }).done(function (data) {
            recaptcha_challenge_field = RecaptchaState.challenge;//RecaptchaState - это загруженная переменная
            captcha_url = "https://www.google.com/recaptcha/api/image?c=" + recaptcha_challenge_field;
            addIMG(captcha_url);
        });
    }
    function post_thread(recaptcha_response_field) {
        return function () {
            if (response!=undefined) {
                if (response.captcha_needed == true) {
                    recaptcha_response_field = document.getElementById('captcha_text').value;
                }
            }
            var thread_url = document.getElementById('URL').value;
            $.post("http://arhivach.org/api/add/", { thread_url: thread_url, recaptcha_response_field: recaptcha_response_field, recaptcha_challenge_field: recaptcha_challenge_field }, "json")
            .done(function (data) {
                console.log("success");
                response = data;
            })
            .fail(function (data) {
                console.log("error");
            })
            .done(function (data) {
                write_captcha_public_key(response);
                response = data;
                check_response();
            });
        }
    }
    function get_captchaImage_url()//возвращает ссылку на пикчу с капчей
    {
        var url;
        url = "https://www.google.com/recaptcha/api/image?c=" + recaptcha_challenge_field;
        return url;
    }
    function write_captcha_public_key(result)//консолирует публичный ключ капчи
    {
        var m = result.captcha_public_key
        console.log(m);
    }
    function addIMG(source) //Добавляет в ДОМ пикчу с капчей
    {
        var img;
        if (document.getElementById('CaptchaImage') == null) {
            var where_to_insert = document.getElementById("PictureBox");
            img = document.createElement("img");
            img.src = source;
            img.id = "CaptchaImage";
            where_to_insert.appendChild(img);
        }
        else 
        {
            img = document.getElementById('CaptchaImage');
            img.src = source;
        }
    }
    function addText_for_Captcha()//Добавляет текстовое поле в ДОМ для ввода капчи
    {
        if (document.getElementById('captcha_text') == null) {
            where_to_insert = document.getElementById("TextBox");
            var TextBox = document.createElement("input");
            TextBox.type = "text";
            TextBox.id = 'captcha_text';
            where_to_insert.appendChild(TextBox);
        }
    }
    function add_Button_Send() {//Добавляет кнопку отправки треда в архивач
        var element = document.getElementById("Send");
        element.onclick = post_thread();
    }
    function check_response() {//Проверяет: если 
        
            if ((response.captcha_needed==true)) {
                addText_for_Captcha();
                addFile_captcha("https://www.google.com/recaptcha/api/challenge?k=" + response.captcha_public_key);
        
    }
    }
    window.onload = function () {
        add_Button_Send();
};
