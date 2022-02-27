/**
 * The webhooks-router.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { WebhooksController } from '../controllers/webhooks-controller.js'

export const router = express.Router()
const controller = new WebhooksController()

router.post('/', controller.authenticate, (req, res, next) => controller.indexPost(req, res, next))
