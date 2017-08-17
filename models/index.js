module.exports = {
	//Admin
	user 							: require('./admin').user,
	group							: require('./admin').group,
	newFeed						: require('./admin').newFeed,
	userMsg						: require('./admin').userMsg, 	
	//Tables
	equipmentstate 		: require('./tables').equipmentstate,
	sp 								: require('./tables').sp,
	tecnology 				: require('./tables').tecnology,
	type  						: require('./tables').type,
	state 						: require('./tables').state,
	ots								: require('./tables').kpi,
	//Wallboard
	wallboard 				: require('./wallboards').ots,
	wallboard_total 	: require('./wallboards').total,
	wallboard_inc   	: require('./wallboards').inc,
	wallboard_support : require('./wallboards').support,
	wallboard_ci 			: require('./wallboards').ci,	
	//KM
	km 								: require('./km'),
	//navbar
	navbar 						: require('./navbar/navbar_model'),
	//INC 
	inc 							: require('./inc/inc_model'),
	//TDS
	tds 							: require('./tds'),
	kpi 							: require('./reporting/kpi/kpi_model'),
	calls							: require('./calls'),
	// ESCALA
	escala: require('./escala'),
	// TAREFAS
	tarefas: require('./tarefas'),
	//Query
	query 						: require('./query'),
	items: require('./items'),
	otsEdist: require('./otsEdist'),
  orderError: require('./orderError'),
  otsToBurn: require('./otsToBurn')
	}