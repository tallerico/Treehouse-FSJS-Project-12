const assert = require('assert')
const expect = require('chai').expect
const should = require('chai').should()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const News = require('./models/News')

const test = express()

describe('News', function() {
	it('Should get news', function() {
		test.get('/api/current_news', function(err, doc) {
			should.not.exist(err)
			should.exist(doc)
			doc.should.be.an('object')
		})
	})
})
