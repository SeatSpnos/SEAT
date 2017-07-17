const createNews = require('./create')
const findNews = require('./find')
const inactiveNews = require('./inactive')

module.exports = {
	find: find,
	create: create,
	inactive: inactive
};

function find (req, res, next) { 
	findNews(req, res, next);
}

function create(req,res,next){
	CreateNews(req,res,function(err,data){
		 if (err) return next(err)

    res.sendStatus(201)
	})
}

function inactive( req, res, next ) {
	InactiveNews ( req, res, next )
}