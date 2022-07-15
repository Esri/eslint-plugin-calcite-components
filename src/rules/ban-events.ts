/* Copyright 2021 Esri
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
import { stencilComponentContext } from 'stencil-eslint-core';
import { CallExpression, Literal } from "estree";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches helps ban or warn against listened event types',
      category: 'Consistency'
    },
    schema: {
      type: "array",
      items: {
        anyOf: [
          { type: "string" },
          {
            type: "object",
            properties: {
              event: { type: "string" },
              message: {
                type: "string",
                minLength: 1
              }
            },
            additionalProperties: false,
            required: ["event"]
          }
        ]
      },
      uniqueItems: true
    },
    type: 'problem'
  },

  create: function (context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const bannedEventToMessageLookup = new Map<string, string | null>();
    context.options.forEach((option: string | { event: string, message?: string }) => {
      const event = typeof option === "string" ? option : option.event;
      const message = typeof option === "string" ? null : option.message ?? null;
      bannedEventToMessageLookup.set(event, message);
    });

    function buildMessage(eventName: string): string {
      return bannedEventToMessageLookup.get(eventName) ?? `${eventName} is not allowed`;
    }

    return {
      ...stencil.rules,
      'MethodDefinition > Decorator[expression.callee.name=Listen] Literal': (node: Literal) => {
        if (stencil.isComponent()) {
          const eventName = node.value as string;

          if(bannedEventToMessageLookup.has(eventName)) {
            context.report({
              node,
              message: buildMessage(eventName)
            });
          }
        }
      },
      'CallExpression:matches([callee.property.name=addEventListener], [callee.property.name=removeEventListener])': (node: CallExpression) => {
        if (stencil.isComponent()) {
          const eventName = (node.arguments[0] as Literal).value as string;

          if(bannedEventToMessageLookup.has(eventName)) {
            context.report({
              node,
              message: buildMessage(eventName)
            });
          }
        }
      }
    };
  }
};

export default rule;

