$(document).ready(function(){

	$('#toggle-switcher').click(function(){
		if($(this).hasClass('opened')){
			$(this).removeClass('opened');
			$('#style-switcher').animate({'right':'-222px'});
		}else{
			$(this).addClass('opened');
			$('#style-switcher').animate({'right':'-10px'});
		}
	});
	
	$('#style-switcher li').click(function(e){
		e.preventDefault();
		
		var stylesheet = 'styles-'+($(this).index()+1)+'.css';
		
		$('link#theme').attr('href', 'assets/css/' + stylesheet);
		
		$('link#theme').load(function(){
			$('link#main').attr('href', 'assets/css/' + stylesheet);
		});
		
	});
});