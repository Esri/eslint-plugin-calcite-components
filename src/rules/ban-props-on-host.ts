/* Copyright 2022 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Rule } from 'eslint';

const eventHandlerPropLikePattern = /^on[A-Z]\w+/;
const allowedExactAttributes = ["id", "calcite-hydrated-hidden", "role", "tabIndex", "tabindex"];

const allowedAttributeName = (attributeName: string): boolean => allowedExactAttributes.includes(attributeName) || attributeName.startsWith("aria-") || eventHandlerPropLikePattern.test(attributeName);

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches usage of banned props on <Host>.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [
      {
        type: 'array',
        items: {
          type: 'string'
        },
        minLength: 1,
        additionalProperties: false
      }
    ],
    type: 'problem'
  },

  create(context): Rule.RuleListener {
    return {
      'JSXIdentifier': (node: any) => {
        if (node.name === "Host" && node.parent.type === 'JSXOpeningElement') {
          const hostAttributes: string[] = [];

          node.parent.attributes.forEach((node: any) => node.name?.name && hostAttributes.push(node.name.name))

          const unauthorizedAttributes = hostAttributes.filter(attribute => !allowedAttributeName(attribute));

          if (unauthorizedAttributes.length > 0) {
            context.report({
              node: node,
              message: `Avoid setting unnecessary attributes/properties on <Host>: ${unauthorizedAttributes.join(", ")}`
            });
          }
        }
      }
    }
  }
};

export default rule;
