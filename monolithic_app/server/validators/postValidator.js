'use strict'
class PostValidator {
  async onCreate (req, res) {
    await this.checkRequired(req, res)
    const errors = await req.getValidationResult()
    return errors
  }

  async onUpdate (req, res) {
    await this.checkRequired(req, res)
    const errors = await req.getValidationResult()
    return errors
  }

  async checkRequired (req, res) {
    req.check('data.title').notEmpty().withMessage('Title required')
    req.check('data.body').notEmpty().withMessage('Body required')
    req.check('data.slug').notEmpty().withMessage('Slug required')
    req.check('data.userId').notEmpty().withMessage('User required')
  }
}

export default new PostValidator()
