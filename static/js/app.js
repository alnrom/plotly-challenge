function optionChanged() {

// Create variable for selector DOM
let selector = d3.select("#selDataset") 

d3.json("samples.json").then(function(incomingData) {

    let ids = incomingData.samples.map(x => x.id);
    // let otu_ids = incomingData.samples.map(x => x.otu_ids);
    // let values = incomingData.samples.map(x => x.sample_values);
    // let otu_labels = incomingData.samples.map(x => x.otu_labels);


    // Iterate through ids and creates list to display in dropdown menu
   ids.forEach(d => {
    selector.append("option").text(d);
   });
    
    
    let selected_id = "";
    let selection_values = [];
    let selection_labels = [];
    let selection_otu_ids = [];
    let selection = selector.property("value");  
        incomingData.samples.forEach(d => {
            if (d.id == selection) {
                selected_id = d.id;
                selection_values.push(d.sample_values);
                selection_labels.push(d.otu_labels);
                selection_otu_ids.push(d.otu_ids);

            }});
    
    
//     function changeId(){

//     }
//    selector.on("change", optionChanged(incomingData));

   let top10_values = selection_values[0].slice(0,10).reverse();
   let top10_labels = selection_labels[0].slice(0,10).reverse();
   let top10_ids = selection_otu_ids[0].slice(0,10).reverse();
   let labels = top10_ids.map(x => "OTU " + String(x));

   console.log(top10_values)
   console.log(top10_labels)
   console.log(labels)
    
    let trace = [{
        type: "bar",
        x: top10_values,
        y: labels,
        orientation : "h"
    }]

    let layout = [{
        title: "Top 10 OTUs Found"
    }]

Plotly.newPlot("bar", trace, layout)


    let trace1 = [{
        x: selection_otu_ids[0],
        y: selection_values[0],
        mode: 'markers', 
        marker : {
            color : selection_otu_ids[0],   
            size : selection_values[0]
        }
    }]

Plotly.newPlot("bubble", trace1)

d3.select("#sample-metadata").html("")
incomingData.metadata.forEach(d => { 
    let selection = d3.select("#selDataset").property("value")
    let table = d3.select("#sample-metadata")
    if (d.id == selection) { 

        Object.entries(d).forEach(([key, value]) => {
            table.append().html(`${key}: ${value} <br>`);
        
        
     });
    }});
    
})};


d3.select("#selDataset").on("change", optionChanged());












