/**
 * The issues-router.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { IssuesController } from '../controllers/issues-controller.js'

export const router = express.Router()
const controller = new IssuesController()

// Get the issue when id is in req param and set it as a property on the request-object.
router.param('id', (req, res, next, id) => controller.loadIssue(req, res, next, id))

router.get('/', (req, res, next) => controller.index(req, res, next))
router.get('/edit/:id', (req, res, next) => controller.edit(req, res, next))
router.post('/edit/:id', (req, res, next) => controller.editPost(req, res, next))
router.post('/close/:id', (req, res, next) => controller.closePost(req, res, next))
router.post('/reopen/:id', (req, res, next) => controller.reopenPost(req, res, next))
