import { Component } from '@angular/core';
interface NodeItem {
  id: string;
  label: string;
  // numeric value that determines displayed size (0..100)
  value: number;
  children?: NodeItem[];
}
@Component({
  selector: 'app-demo-two',
  templateUrl: './demo-two.component.html',
  styleUrls: ['./demo-two.component.scss']
})
export class DemoTwoComponent {
 // configurable min/max pixel sizes for circles
  minPx = 24;
  maxPx = 120;

  // sample data: 3 parents A,B,C each with two children
  nodes: NodeItem[] = [
    { id: 'A', label: 'A', value: 80, children: [
      { id: 'A1', label: 'a1', value: 40 },
      { id: 'A2', label: 'a2', value: 20 }
    ]},
    { id: 'B', label: 'B', value: 60, children: [
      { id: 'B1', label: 'b1', value: 70 },
      { id: 'B2', label: 'b2', value: 10 }
    ]},
    { id: 'C', label: 'C', value: 30, children: [
      { id: 'C1', label: 'c1', value: 50 },
      { id: 'C2', label: 'c2', value: 90 }
    ]}
  ];

  // map a value 0..100 to px size between minPx and maxPx
  sizeFor(value: number) {
    const v = Math.max(0, Math.min(100, value ?? 0));
    return Math.round(this.minPx + (v / 100) * (this.maxPx - this.minPx));
  }

  // example controls:
  increase(node: NodeItem, step = 10) {
    node.value = Math.min(100, (node.value ?? 0) + step);
  }
  decrease(node: NodeItem, step = 10) {
    node.value = Math.max(0, (node.value ?? 0) - step);
  }

  // add new child to a parent
  addChild(parent: NodeItem) {
    const nextIdx = (parent.children?.length ?? 0) + 1;
    const newChild: NodeItem = {
      id: parent.id + '-c' + nextIdx,
      label: parent.label.toLowerCase() + nextIdx,
      value: 50
    };
    parent.children = [...(parent.children ?? []), newChild];
  }

  // remove last child
  removeChild(parent: NodeItem) {
    if (!parent.children || parent.children.length === 0) return;
    parent.children = parent.children.slice(0, parent.children.length - 1);
  }
}
