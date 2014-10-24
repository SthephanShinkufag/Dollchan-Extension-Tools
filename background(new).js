var response; //Ответ от Архивача
var recaptcha_challenge_field; //Переменная, необходимая для активации РеКаптчи
var captcha_url; //Ссылка на изображение каптчи
function addFile_captcha(url) { //Тут получаем из гугла файл с переменной, из которой берем recaptcha_challenge_field
	$.getScript(url, function (data) {}).done(function (data) {
		recaptcha_challenge_field = RecaptchaState.challenge; //RecaptchaState - это загруженная переменная
		captcha_url = "https://www.google.com/recaptcha/api/image?c=" + recaptcha_challenge_field;
		console.log("URL капчи: " + captcha_url);
	});
}
function post_thread(thread_url, recaptcha_response_field) //thread_url - ссылка на тред, recaptcha_response_field - ответ пользователя на капчу
{
	$.post("http://arhivach.org/api/add/", {
		thread_url : thread_url,
		recaptcha_response_field : recaptcha_response_field,
		recaptcha_challenge_field : recaptcha_challenge_field
	}, "json")
	.done(function (data) {
		response = data;
	})
	.fail(function (data) {
		console.log("error");
	})
	.done(function (data) {
		response = data;
		check_response();
		what_to_show();
	});
}
function get_captchaImage_url() //возвращает ссылку на пикчу с капчей
{
	var url = "https://www.google.com/recaptcha/api/image?c=" + recaptcha_challenge_field;
	return url;
}
function check_response() { //Проверка на возможность НЕ вводить капчу при отправлении
	if ((response.captcha_needed == true)) {
		addFile_captcha("https://www.google.com/recaptcha/api/challenge?k=" + response.captcha_public_key);
	}
}
function tell_user(array_to_show) {
	if (array_to_show.length > 0) {
		console.log("Text: ");
		for (var i = 0; i < array_to_show.length; i++) {
			console.log((i + 1).toString() + ". " + array_to_show[i]);
		}
	}
}
function what_to_show() {
	if (response.success != undefined) {
		tell_user(response.success);
	}
	if (response.warnings != undefined) {
		tell_user(response.warnings);
	}
	if (response.errors != undefined) {
		tell_user(response.errors);
	}
}
