FROM kong:2.0.3

USER root

ENV KONG_PLUGINS=bundled,kong-spec-expose,oidc

# install Kong's Spec Expose plugin
RUN luarocks install kong-spec-expose

# install kong-oidc plugin from https://github.com/nokia/kong-oidc/
RUN luarocks install kong-oidc