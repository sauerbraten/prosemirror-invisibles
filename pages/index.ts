import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import createInvisiblesPlugin, {
  hardBreak,
  paragraph,
  space,
  commands,
} from "../src/ts";

import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "prosemirror-example-setup/style/style.css";
import "../src/css/invisibles.scss";

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

const view = new EditorView(document.querySelector("#editor") as Element, {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector("#content") as Element
    ),
    plugins: [
      ...exampleSetup({ schema: mySchema }),
      createInvisiblesPlugin([hardBreak(), paragraph(), space()]),
    ],
  }),
});

const toggle = document.getElementById("show-invisibles");
toggle && toggle.addEventListener("change", (event) => {
  const value = (event.currentTarget as HTMLInputElement).checked
  commands.setActiveState(value)(view.state, view.dispatch);
});
