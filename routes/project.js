const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/project');
const authMiddleware = require('../middlewares/auth');

// Validators
const projectValidators = [
  check('name')
    .not().isEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
  check('status')
    .isIn(['notStarted', 'pending', 'completed']).withMessage('Invalid status'),
  check('deadlineDate')
    .optional({ nullable: true })
    .isISO8601().toDate().withMessage('Invalid deadline date format. Use ISO 8601 format (YYYY-MM-DD)'),
  check('createdDate')
    .optional({ nullable: true })
    .isISO8601().toDate().withMessage('Invalid created date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)'),
  check('creatorName')
    .not().isEmpty().withMessage('Creator name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Creator name must be between 3 and 50 characters'),
];

// Routes
router.get('/', projectController.getProjects);
router.post('/', projectValidators, projectController.addProject);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.put('/:id', authMiddleware, projectValidators, projectController.updateProjectById);
router.delete('/:id', authMiddleware, projectController.deleteProjectById);
router.put('/:id/assign-users', authMiddleware, projectController.assignUsersToProject);

module.exports = router;
