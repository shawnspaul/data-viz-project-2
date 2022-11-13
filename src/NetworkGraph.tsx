import React, { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { SigmaContainer, ControlsContainer, FullScreenControl, useRegisterEvents } from "@react-sigma/core";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import networkList from "./assets/network_connections.json";
import list from './assets/list.json';
import { getModColor } from "./State/ModularityGroups";

const NetworkGraph: React.FC<{}> = () => {
    const [graph, setGraph] = useState<MultiDirectedGraph>()
    useEffect(() => {
        // const uniqueUsers = new Set(networkList.map(nl => nl.target));
        // console.log(uniqueUsers)
        list.sort(function(a, b) {
            return a["luminaries group number"] - b["luminaries group number"];
        });
        const g = new MultiDirectedGraph()
        let x = 0;
        let y = 0;
        let i = 0;
        list.forEach(function (l) {
            const color = getModColor(l["luminaries group number"]);
            g.addNode(l["handle"],{ 
                x, 
                y, 
                label: l["user name"], 
                cluster_id: l["luminaries group number"],
                size: 3,
                color
            });
            
            if (i < 20) {
                x = x + 1
            } else if (i === 20) {
                i = 0;
                y = y + 1;
                x = 0;
            }
            i++;
        });
        networkList.forEach((l) => {
            try {
                g.addEdge(l.source, l.target, { type: "arrow", size: 0.1 })
            } catch (e) {
                console.log(e);
            }
            
        });
        setGraph(g);
    },[])

    const GraphEvents: React.FC = () => {
        const registerEvents = useRegisterEvents();
    
        useEffect(() => {
          // Register the events
          registerEvents({
            // node events
            clickNode: (event) => console.log("clickNode", event.event, event.node, event.preventSigmaDefault),
            enterNode: (event) => console.log("enterNode", event),
            leaveNode: (event) => console.log("leaveNode", event),
          });
        }, [registerEvents]);
    
        return null;
      };
  
  
  return (
    <SigmaContainer
      graph={graph}
      style={{ height: "500px" }}
      settings={{
        nodeProgramClasses: { image: getNodeProgramImage() },
        defaultNodeType: "image",
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
      }}
    >
      <ControlsContainer position={"bottom-right"}>
        {/* <ZoomControl /> */}
        <FullScreenControl />
        <LayoutForceAtlas2Control />
      </ControlsContainer>
      {/* <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer> */}
      {/* <GraphEvents /> */}
    </SigmaContainer>
  );
};

export default NetworkGraph;