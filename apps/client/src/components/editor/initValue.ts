export const WITH_BASIC_INIT_VALUE = {
  'idea-title': {
    id: 'idea-title',
    value: [
      {
        id: 'title-heading',
        type: 'heading-two',
        children: [
          {
            text: 'New Product Idea: [Your Idea Title]',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  'idea-description': {
    id: 'idea-description',
    value: [
      {
        id: 'description-callout',
        type: 'callout',
        children: [
          {
            text: 'Brief description of the idea and its primary goal.',
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'info',
        },
      },
    ],
    type: 'Callout',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  'idea-features-heading': {
    id: 'idea-features-heading',
    type: 'HeadingThree',
    meta: {
      order: 2,
      depth: 0,
    },
    value: [
      {
        id: 'features-heading',
        type: 'heading-three',
        children: [
          {
            text: 'Key Features',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  'feature-list-1': {
    id: 'feature-list-1',
    value: [
      {
        id: 'feature-item-1',
        type: 'bulleted-list',
        children: [
          {
            text: 'Feature 1: Description of feature 1',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 3,
      depth: 0,
    },
  },
  'feature-list-2': {
    id: 'feature-list-2',
    value: [
      {
        id: 'feature-item-2',
        type: 'bulleted-list',
        children: [
          {
            text: 'Feature 2: Description of feature 2',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  'feature-list-3': {
    id: 'feature-list-3',
    value: [
      {
        id: 'feature-item-3',
        type: 'bulleted-list',
        children: [
          {
            text: 'Feature 3: Description of feature 3',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 5,
      depth: 0,
    },
  },
  'idea-benefits-heading': {
    id: 'idea-benefits-heading',
    type: 'HeadingThree',
    meta: {
      order: 6,
      depth: 0,
    },
    value: [
      {
        id: 'benefits-heading',
        type: 'heading-three',
        children: [
          {
            text: 'Benefits',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  'benefit-list-1': {
    id: 'benefit-list-1',
    value: [
      {
        id: 'benefit-item-1',
        type: 'bulleted-list',
        children: [
          {
            text: 'Benefit 1: Description of benefit 1',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  'benefit-list-2': {
    id: 'benefit-list-2',
    value: [
      {
        id: 'benefit-item-2',
        type: 'bulleted-list',
        children: [
          {
            text: 'Benefit 2: Description of benefit 2',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  'idea-target-market-heading': {
    id: 'idea-target-market-heading',
    type: 'HeadingThree',
    meta: {
      order: 9,
      depth: 0,
    },
    value: [
      {
        id: 'target-market-heading',
        type: 'heading-three',
        children: [
          {
            text: 'Target Market',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  'target-market-description': {
    id: 'target-market-description',
    value: [
      {
        id: 'market-description',
        type: 'paragraph',
        children: [
          {
            text: 'Describe the target market for this product idea.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 10,
      depth: 0,
    },
  },
  'idea-competition-heading': {
    id: 'idea-competition-heading',
    type: 'HeadingThree',
    meta: {
      order: 11,
      depth: 0,
    },
    value: [
      {
        id: 'competition-heading',
        type: 'heading-three',
        children: [
          {
            text: 'Competition',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  'competition-analysis': {
    id: 'competition-analysis',
    value: [
      {
        id: 'competition-description',
        type: 'paragraph',
        children: [
          {
            text: 'Brief analysis of the competition and how this idea stands out.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 12,
      depth: 0,
    },
  },
  'idea-roadmap-heading': {
    id: 'idea-roadmap-heading',
    type: 'HeadingThree',
    meta: {
      order: 13,
      depth: 0,
    },
    value: [
      {
        id: 'roadmap-heading',
        type: 'heading-three',
        children: [
          {
            text: 'Roadmap',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  'roadmap-description': {
    id: 'roadmap-description',
    value: [
      {
        id: 'roadmap-details',
        type: 'paragraph',
        children: [
          {
            text: 'Outline the development roadmap for this idea.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 14,
      depth: 0,
    },
  },
};
