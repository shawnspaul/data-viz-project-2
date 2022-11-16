import React, { useEffect } from "react";
import networkList from "./assets/network_connections.json";
import list from './assets/list.json';
import { getModColor, ModGroupsSelector } from "./State/ModularityGroups";
import G6, { ComboConfig, EdgeConfig, NodeConfig, TreeGraphData, IGraph } from '@antv/g6';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from "recoil";
import SelectedUser from "./State/SelectedUser";
G6.registerNode(
    'bubble',
    {
      drawShape(cfg, group) {
        const self = this;
        //@ts-ignore
        const r = cfg.size / 2;
        // a circle by path
        const path = [
          ['M', -r, 0],
          ['C', -r, r / 2, -r / 2, r, 0, r],
          ['C', r / 2, r, r, r / 2, r, 0],
          ['C', r, -r / 2, r / 2, -r, 0, -r],
          ['C', -r / 2, -r, -r, -r / 2, -r, 0],
          ['Z'],
        ];
        //@ts-ignore
        const keyShape = group.addShape('path', {
          attrs: {
            x: 0,
            y: 0,
            path,
            //@ts-ignore
            fill: cfg.color || 'steelblue',
          },
          name: 'path-shape',
        });
  //@ts-ignore
        const mask = group.addShape('path', {
          attrs: {
            x: 0,
            y: 0,
            path,
            opacity: 0.25,
            //@ts-ignore
            fill: cfg.color || 'steelblue',
            //@ts-ignore
            shadowColor: cfg.color.split(' ')[2].substr(2),
            shadowBlur: 40,
            shadowOffsetX: 0,
            shadowOffsetY: 30,
          },
          name: 'mask-shape',
        });
  
        const spNum = 10; // split points number
        const directions: number[] = [],
          rs: number[] = [];
          //@ts-ignore
        self.changeDirections(spNum, directions);
        for (let i = 0; i < spNum; i++) {
          const rr = r + directions[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
          if (rs[i] < 0.97 * r) rs[i] = 0.97 * r;
          else if (rs[i] > 1.03 * r) rs[i] = 1.03 * r;
          rs.push(rr);
        }
        keyShape.animate(
          () => {
            //@ts-ignore
            const path = self.getBubblePath(r, spNum, directions, rs);
            return { path };
          },
          {
            repeat: true,
            duration: 10000,
          },
        );
  
        const directions2: number[] = [],
          rs2: number[] = [];
          //@ts-ignore
        self.changeDirections(spNum, directions2);
        for (let i = 0; i < spNum; i++) {
          const rr = r + directions2[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
          if (rs2[i] < 0.97 * r) rs2[i] = 0.97 * r;
          else if (rs2[i] > 1.03 * r) rs2[i] = 1.03 * r;
          rs2.push(rr);
        }
        mask.animate(
          () => {
            //@ts-ignore
            const path = self.getBubblePath(r, spNum, directions2, rs2);
            return { path };
          },
          {
            repeat: true,
            duration: 10000,
          },
        );
        return keyShape;
      },
      changeDirections(num: number, directions: number[]) {
        for (let i = 0; i < num; i++) {
          if (!directions[i]) {
            const rand = Math.random();
            const dire = rand > 0.5 ? 1 : -1;
            directions.push(dire);
          } else {
            directions[i] = -1 * directions[i];
          }
        }
        return directions;
      },
      getBubblePath(r: number, spNum: number, directions: number[], rs: number[]) {
        const path = [];
        const cpNum = spNum * 2; // control points number
        const unitAngle = (Math.PI * 2) / spNum; // base angle for split points
        let angleSum = 0;
        const sps = [];
        const cps = [];
        for (let i = 0; i < spNum; i++) {
          const speed = 0.001 * Math.random();
          rs[i] = rs[i] + directions[i] * speed * r; // +-r/6, the sign according to the directions
          if (rs[i] < 0.97 * r) {
            rs[i] = 0.97 * r;
            directions[i] = -1 * directions[i];
          } else if (rs[i] > 1.03 * r) {
            rs[i] = 1.03 * r;
            directions[i] = -1 * directions[i];
          }
          const spX = rs[i] * Math.cos(angleSum);
          const spY = rs[i] * Math.sin(angleSum);
          sps.push({ x: spX, y: spY });
          for (let j = 0; j < 2; j++) {
            const cpAngleRand = unitAngle / 3;
            const cpR = rs[i] / Math.cos(cpAngleRand);
            const sign = j === 0 ? -1 : 1;
            const x = cpR * Math.cos(angleSum + sign * cpAngleRand);
            const y = cpR * Math.sin(angleSum + sign * cpAngleRand);
            cps.push({ x, y });
          }
          angleSum += unitAngle;
        }
        path.push(['M', sps[0].x, sps[0].y]);
        for (let i = 1; i < spNum; i++) {
          path.push([
            'C',
            cps[2 * i - 1].x,
            cps[2 * i - 1].y,
            cps[2 * i].x,
            cps[2 * i].y,
            sps[i].x,
            sps[i].y,
          ]);
        }
        path.push(['C', cps[cpNum - 1].x, cps[cpNum - 1].y, cps[0].x, cps[0].y, sps[0].x, sps[0].y]);
        path.push(['Z']);
        return path;
      },
      setState(name, value, item) {
        //@ts-ignore
        const shape = item.get('keyShape');
        if (name === 'dark') {
          if (value) {
            if (shape.attr('fill') !== '#fff') {
              shape.oriFill = shape.attr('fill');
              //@ts-ignore
              const uColor = unlightColorMap.get(shape.attr('fill'));
              shape.attr('fill', uColor);
            } else {
              shape.attr('opacity', 0.2);
            }
          } else {
            if (shape.attr('fill') !== '#fff') {
              shape.attr('fill', shape.oriFill || shape.attr('fill'));
            } else {
              shape.attr('opacity', 1);
            }
          }
        }
      },
    },
    'single-node',
  );
  
  G6.registerNode(
    'animate-circle',
    {
      setState(name, value, item) {
        //@ts-ignore
        const shape = item.get('keyShape');
        const label = shape.get('parent').get('children')[1];
        if (name === 'disappearing' && value) {
          shape.animate(
            (ratio: number) => {
              return {
                opacity: 1 - ratio,
                r: shape.attr('r') * (1 - ratio),
              };
            },
            {
              duration: 200,
            },
          );
          label.animate(
            (ratio: number) => {
              return {
                opacity: 1 - ratio,
              };
            },
            {
              duration: 500,
            },
          );
        } else if (name === 'appearing' && value) {
            //@ts-ignore
          const r = item.getModel().size / 2;
          shape.animate(
            (ratio: number) => {
              return {
                opacity: ratio,
                r: r * ratio,
                fill: shape.attr('fill'),
              };
            },
            {
              duration: 300,
            },
          );
          label.animate(
            {
              onFrame(ratio: any) {
                return {
                  opacity: ratio,
                };
              },
            },
            {
              duration: 300,
            },
          );
        } else if (name === 'dark') {
          if (value) {
            if (shape.attr('fill') !== '#fff') {
              shape.oriFill = shape.attr('fill');
              //@ts-ignore
              const uColor = unlightColorMap.get(shape.attr('fill'));
              shape.attr('fill', uColor);
            } else {
              shape.attr('opacity', 0.2);
              label.attr('fill', '#A3B1BF');
            }
          } else {
            if (shape.attr('fill') !== '#fff') {
              shape.attr('fill', shape.oriFill || shape.attr('fill'));
            } else {
              shape.attr('opacity', 1);
              label.attr('fill', '#697B8C');
            }
          }
        }
      },
    },
    'circle',
  );
  
  G6.registerEdge(
    'animate-line',
    {
      drawShape(cfg, group) {
        const self = this;
        let shapeStyle = self.getShapeStyle(cfg);
        shapeStyle = Object.assign(shapeStyle, {
          opacity: 0,
          strokeOpacity: 0,
        });
        //@ts-ignore
        const keyShape = group.addShape('path', {
          attrs: shapeStyle,
          name: 'path-shape',
        });
        return keyShape;
      },
      afterDraw(cfg, group) {
        const shape = group?.get('children')[0];
        shape.animate(
          (ratio: number) => {
            //@ts-ignore
            const opacity = ratio * cfg?.style?.opacity;
            //@ts-ignore
            const strokeOpacity = ratio * cfg?.style?.strokeOpacity;
            return {
              opacity: ratio || opacity,
              strokeOpacity: ratio || strokeOpacity,
            };
          },
          {
            duration: 300,
          },
        );
      },
      setState(name, value, item) {
        //@ts-ignore
        const shape = item.get('keyShape');
        if (name === 'disappearing' && value) {
          shape.animate(
            (ratio: number) => {
              return {
                opacity: 1 - ratio,
                strokeOpacity: 1 - ratio,
              };
            },
            {
              duration: 200,
            },
          );
        } else if (name === 'dark') {
          if (value) shape.attr('opacity', 0.2);
          else shape.attr('opacity', 1);
        }
      },
    },
    'line',
  );
  
const NetworkGraph: React.FC<{}> = () => {
    const setSelectedUser = useSetRecoilState(SelectedUser);
    const modGroups = useRecoilValue(ModGroupsSelector);
    //@ts-nocheck
    let graph: IGraph;

    useEffect(() => {
        const container = document.getElementById('network-graph');
        if (container) {
            let data: any = {
                nodes: [],
                edges: []
            }
            list.forEach(function (l) {
                const color = getModColor(l["luminaries group number"]);
                if (modGroups.includes(l["luminaries group number"])) {
                    data.nodes.push({
                        id: l["handle"],
                        name: l["user name"], 
                        cluster_id: l["luminaries group number"],
                        color
                    });
                }
            });
            networkList.forEach((l) => {
                try {
                    data.edges.push({
                        "eid": uuidv4(),
                        "source": l.source,
                        "sourceSimName":l.source,
                        "sourceName": l.source,
                        "target": l.target,
                        "targetSimName": l.target,
                        "targetName": l.target,
                    })
                } catch (e) {
                    console.log(e);
                }
                
            });
            const width = container.scrollWidth;
            const height = container.scrollHeight || 500;
            graph = new G6.Graph({
                container: 'network-graph',
                width,
                height,
                layout: {
                    type: 'force',
                    clustering: true,
                    clusterNodeStrength: 3,
                    clusterEdgeDistance: 200,
                    clusterNodeSize: 20,
                    clusterFociStrength: .5,
                    nodeSpacing: 5,
                    preventOverlap: true,
                },
                defaultNode: {
                    size: 15,
                },
                modes: {
                    default: ['zoom-canvas', 'drag-canvas', 'drag-node',
                    // {
                    //     type: 'tooltip',
                    //     formatText(model) {
                    //       const text = JSON.stringify(model);
                    //       return text;
                    //     },
                    //     shouldUpdate: (e) => true,
                    // },
                    ],
                },
            });

            data.nodes.forEach((i:any) => {
                try {
                    i.cluster = i.cluster_id;
                    i.style = Object.assign(i.style || {}, {
                        fill: i.color,
                    });
                } catch (e) {
                    console.log(e)
                }
                
            });
            graph.data(data);
            
            graph.render();

            graph.on('node:mouseleave', (e) => {
                const nodeItems = graph.getNodes();
                const edgeItems = graph.getEdges();
                nodeItems.forEach((item) => {
                    graph.setItemState(item, 'dark', false);
                });
                edgeItems.forEach((item) => {
                    graph.setItemState(item, 'dark', false);
                });
            });
            let showNodes: any[] = [];
            // let showEdges: any[] = [];
            let curShowNodes: any = [];
            let curShowEdges: any = [];
            let nodes: any[] = [];
            // let edges = [];
            let nodeMap = new Map();
            let edgesMap = new Map();
            let curShowNodesMap = new Map();
            // let highlighting = false;
            let currentFocus: EdgeConfig | TreeGraphData | NodeConfig | ComboConfig | undefined;
            nodes = data.nodes;
            // edges = data.edges;
            graph.on('node:mouseenter', (e) => {
                const item = e.item;
                const model = item?.getModel();
                // highlighting = true;
                graph.setAutoPaint(false);
                const nodeItems = graph.getNodes();
                const edgeItems = graph.getEdges();
                nodeItems.forEach((node) => {
                  graph.setItemState(node, 'dark', true);
                  node.getModel().light = false;
                });
                //@ts-ignore
                graph.setItemState(item, 'dark', false);
                 //@ts-ignore
                model.light = true;
                const findTagsMap = new Map();
                // find the nodes with tag === tags[?]
                nodeItems.forEach((item) => {
                  const node = item.getModel();
                  if (findTagsMap.get(node.tag) !== undefined) {
                    graph.setItemState(item, 'dark', false);
                    node.light = true;
                  }
                });
                edgeItems.forEach((item) => {
                  const source = item.getSource().getModel();
                  const target = item.getTarget().getModel();
                  if (source.light && target.light) {
                    graph.setItemState(item, 'dark', false);
                  } else {
                    graph.setItemState(item, 'dark', true);
                  }
                });
                graph.paint();
                graph.setAutoPaint(true);
            });

            graph.on('node:click', (e) => {
                curShowNodes = [];
                curShowEdges = [];
                const item = e.item;
                const model = item?.getModel();
                setSelectedUser(model?.id as string)
                    // if clicked a root, hide unrelated items and show the related items
                    //@ts-ignore
                    if (model.level === 0) {
                    const layoutController = graph.get('layoutController');
                    const forceLayout = layoutController.layoutMethods[0];
                    forceLayout.forceSimulation.stop();
                    // light the level 0 nodes
                    showNodes.forEach((snode) => {
                        const item = graph.findById(snode.id);
                        graph.setItemState(item, 'dark', false);
                        if (snode.x < 0.5 * width) {
                        snode.x = 300;
                        } else {
                        snode.x = width - 300;
                        }
                    });
                    //@ts-ignore
                    model.x = width / 2;
                    //@ts-ignore
                    model.y = height / 2;
                    // animatively hide the items which are going to disappear
                    if (curShowEdges.length) {
                        curShowEdges.forEach((csedge: { id: string; }) => {
                        const item = graph.findById(csedge.id);
                        item && graph.setItemState(item, 'disappearing', true);
                        });
                    }
                    curShowNodes.forEach((csnode: { id: string; }) => {
                        const item = graph.findById(csnode.id);
                        item && graph.setItemState(item, 'disappearing', true);
                    });
                    graph.positionsAnimate();
                
                    // reset curShowNodes nad curShowEdges
                    curShowNodes = [];
                    curShowEdges = [];
                
                    // click on the same node which is the current focus node, hide the small nodes, change the layout parameters to roots view
                    //@ts-ignore
                    if (currentFocus && currentFocus.id === model.id) {
                        currentFocus = undefined;
                        layoutController.layoutCfg.nodeStrength = 2500;
                        layoutController.layoutCfg.collideStrength = 0.8;
                        layoutController.layoutCfg.alphaDecay = 0.01;
                    } else {
                        // click other focus node, hide the current small nodes and show the related nodes
                        currentFocus = model;
                        // change data after the original items disappearing
                        const layoutController = graph.get('layoutController');
                        layoutController.layoutCfg.nodeStrength = () => {
                        return -80;
                        };
                        layoutController.layoutCfg.collideStrength = 0.2;
                        layoutController.layoutCfg.linkDistance = (d: { source: { level: number; }; }) => {
                        if (d.source.level !== 0) return 120;
                        const length = 250;
                        return length;
                        };
                        layoutController.layoutCfg.edgeStrength = () => {
                        return 2;
                        };
                        //@ts-ignore
                        const tag = model.tag;
                        const findTags: any[] = [];
                        curShowNodesMap = new Map();
                        // find the nodes which are the descendants of clicked model
                        nodes.forEach((node) => {
                        if (!node.tags) return;
                        const tags = node.tags;
                        const tlength = tags.length;
                        let isChild = false;
                        const parents = [];
                        for (let i = 0; i < tlength; i++) {
                            const ts = tags[i].split('-');
                            if (ts[0] === tag) {
                            isChild = true;
                            }
                            parents.push(nodeMap.get(ts[0]));
                        }
                        if (isChild) {
                            const randomAngle = Math.random() * 2 * Math.PI;
                            //@ts-ignore
                            node.x = model.x + (Math.cos(randomAngle) * model.size) / 2 + 10;
                            //@ts-ignore
                            node.y = model.y + (Math.sin(randomAngle) * model.size) / 2 + 10;
                            // const dist = (model.x - node.x) * (model.x - node.x) + (model.y - node.y) * (model.y - node.y);
                
                            if (!node.style) node.style = {};
                            node.style.lineWidth = 0;
                            node.style.opacity = 1;
                            if (node.isLeaf) {
                            node.type = 'animate-circle';
                            let color = 'l(0)';
                            const parentsNum = parents.length;
                            parents.forEach((parent, i) => {
                                const parentColor = parent.color.split(' ')[1].substr(2);
                                color += ` ${i / (parentsNum - 1)}:${parentColor}`;
                            });
                            if (parentsNum === 1) {
                                //@ts-ignore
                                color = model.color.split(' ')[1].substr(2);
                            }
                            node.color = color;
                            node.style.fill = color;
                            node.style.fill = '#fff';
                            node.style.lineWidth = 1;
                            node.size = 60;
                            node.labelCfg = {
                                style: {
                                fontSize: 11,
                                lineHeight: 19,
                                fill: '#697B8C',
                                },
                                position: 'center',
                            };
                            } else if (node.level !== 0) {
                            node.type = 'circle'; // 'bubble';
                            node.size = 95;
                            if (!node.style) node.style = {};
                            //@ts-ignore
                            node.color = model.color;
                            //@ts-ignore
                            node.style.fill = model.color;
                            node.labelCfg = {
                                style: {
                                fill: '#fff',
                                fontSize: 14,
                                },
                                position: 'center',
                            };
                            }
                            curShowNodes.push(node);
                            curShowNodesMap.set(node.id, node);
                
                            // add the edge connect from model to node which exists in edges
                            //@ts-ignore
                            const edgeId = `${model.id}-${node.id}`;
                            const edge = edgesMap.get(edgeId);
                            if (edge) {
                                //@ts-ignore
                            edge.color = model.color;
                            curShowEdges.push(edge);
                            }
                            tags.forEach((t: string) => {
                            const ts = t.split('-');
                            if (ts[0] !== tag) {
                                findTags.push(ts[0]);
                            }
                            if (ts[1]) {
                                findTags.push(ts[1]);
                            }
                            });
                        }
                        });
                
                        // find the nodes which are the ancestors of the current curShowNodes
                        nodes.forEach((node) => {
                        const findTagsLength = findTags.length;
                        for (let i = 0; i < findTagsLength; i++) {
                            if (node.tag === findTags[i] && curShowNodesMap.get(node.id) === undefined) {
                            curShowNodes.push(node);
                            curShowNodesMap.set(node.id, node);
                            return;
                            }
                        }
                        });
                
                        // find the edges whose target end source are in the curShowNodes
                        curShowNodes.forEach((nu: { level: number; id: any; isLeaf: any; tag: unknown; tags: unknown[]; }, i: number) => {
                        const lu = nu.level;
                        curShowNodes.forEach((nv: { level: number; id: any; tag: unknown; isLeaf: any; tags: unknown[]; }, j: number) => {
                            if (j <= i) return;
                            const lv = nv.level;
                            let edgeId;
                            if (lu < lv) {
                            edgeId = `${nu.id}-${nv.id}`;
                            } else {
                            edgeId = `${nv.id}-${nu.id}`;
                            }
                            //@ts-ignore
                            let color = model.color;
                            if (nu.isLeaf) {
                                //@ts-ignore
                            if (nv.level === 0 && nv.tag !== model.tag) color = '#DFE5EB';
                            //@ts-ignore
                            else if (!nv.isLeaf && nv.tags[0] !== model.tag) {
                                color = '#DFE5EB';
                            }
                            } else if (nv.isLeaf) {
                                //@ts-ignore
                            if (nu.level === 0 && nu.tag !== model.tag) color = '#DFE5EB';
                            //@ts-ignore
                            else if (!nu.isLeaf && nu.tags[0] !== model.tag) {
                                color = '#DFE5EB';
                            }
                            }
                            const edge = edgesMap.get(edgeId);
                            if (edge) {
                            edge.color = color;
                            curShowEdges.push(edge);
                            }
                        });
                        });
                    }
                }
            });
            if (typeof window !== 'undefined') {
                window.onresize = () => {
                    if (!graph || graph.get('destroyed')) return;
                    if (!container || !container.scrollWidth || !container.scrollHeight) return;
                    graph.changeSize(container.scrollWidth, container.scrollHeight);
                };
            }
            
        }
          
        return () => {
            graph.destroy()
        }
    },[modGroups]);

    return <div id="network-graph" style={{width: '100%', height: 500}}></div>
};

export default NetworkGraph;