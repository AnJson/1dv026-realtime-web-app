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

router.get('/', controller.index)
router.get('/edit/:id', controller.edit)
router.post('/edit/:id', controller.editPost)
