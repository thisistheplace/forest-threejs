
module ForestThreejs
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.5"

include("jl/forestthreejs.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "forest_threejs",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "forest_threejs.min.js",
    external_url = "https://unpkg.com/forest_threejs@0.0.5/forest_threejs/forest_threejs.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "forest_threejs.min.js.map",
    external_url = "https://unpkg.com/forest_threejs@0.0.5/forest_threejs/forest_threejs.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
