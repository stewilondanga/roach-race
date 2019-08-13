$('document').ready(()=>{
	const windWidth = $(document).innerWidth();
	const windHeight = $(document).innerHeight();
	const posImg = $('#field').position();
	const fieldHeight = $('#field').outerHeight();
	const winnerText = $('#winnerText');
	let count = 0;
	// work with checkboxes
	const objs = $("input:checkbox");
	$("input:checkbox").on("change", function(){
	    let nameObj = $(this).attr("name");
			if($(this).is(":checked")) {
					$('div[id=' + nameObj +']').addClass('active');
				 	$('div[id=' + nameObj +']').css({opacity: 1,});
        }else{
					$('div[id=' + nameObj +']').removeClass('active');
					$('div[id=' + nameObj +']').css({opacity: 0,});
				}
	});

	const initRun = ()=>{
		players = [0,0,0,0];
		winnerText.hide(1);
		anime.remove('.cockroach.active');
		anime({
			targets: '.cockroach',
			translateX: 0,
			translateY: ()=>{return anime.random(fieldHeight/2-50, fieldHeight/2+50)},
			rotate: {
				value: 180,
				duration: 1,
			},
		})
	};
	const showWinner = ()=>{
			let min = 99999999999;
			let minInd = 0;
			players.forEach((val, ind, arr)=>{
				if(val < min && val !== 0){
					min=val;
					minInd=ind;
				}
			});
		const q = ()=>{
			if (!count){
					winnerText
						.text('Win cockroach number '+ parseInt(minInd+1) + '!')
						.show(400, ()=>{
						winnerText
							.delay(1000)
							.hide(200);
					});
			}else{
				setTimeout(q, 100);
			}
		}
		setTimeout(q, 100);
	}
	const getRandomXY = (ind)=>{
		const numberSteps = anime.random(200, 250);
		const valueX = [];
		const valueY = [];
		const valueRotate = [];
		let stepX = 0;
		let stepY = $('#field').outerHeight()/2;
		let stepRotate = 180;
		let dur = 0;
		const minStep = Math.floor(windWidth/numberSteps);
		for (let i=0; i<numberSteps; i++){
				stepX = stepX + anime.random(minStep, minStep+50);
				stepY = stepY + anime.random(-30,30);
				dur = anime.random(1000, 2000);

				players[parseInt(ind)-1] += dur;

				if (stepY < 0){
					stepY = 0;
				}else if(stepY > fieldHeight){
					stepY = fieldHeight;
				}
				if(stepX < (posImg.left+$('#field').outerWidth())){
					valueY.push({value: stepY, duration: dur});
					valueX.push({value: stepX, duration: dur});
					if (stepY < 0){
						stepRotate = 180 - anime.random(0, 10);
					}else{
						stepRotate = 180 + anime.random(0, 10);
					}
					valueRotate.push({value: stepRotate})
				}
		}
		return {x: valueX, y: valueY, rotate: valueRotate};
	}
		const showRun = ()=>{
			const motionPlayer = function(ind){
			count = $('.cockroach.active').length;
				console.log(count);
				const randomObj = getRandomXY(ind);
				anime({
					targets: '#player-'+ind,
					translateX: randomObj.x,
					translateY: randomObj.y,
					rotate: randomObj.rotate,
					complete: ()=>{count--;},
				});
		};
		$('.cockroach.active').each((i, el)=>{
				const ind = $(el).attr('data-number');
				motionPlayer(ind);
		});
		showWinner();
	};
	$('#buttonGo').on('click', showRun);
	$('#buttonStart').on('click', initRun);
	initRun();
});

var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
