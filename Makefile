.PHONY: local

APP_IMAGE=coco_cms_local
NAMESPACE=coco-cms

local:
	kubectl delete namespace ${NAMESPACE} || true
	docker build --build-arg STAGE=dev -t ${APP_IMAGE} .
	kubectl create namespace ${NAMESPACE} || true
	helm upgrade \
		--install \
		--namespace=${NAMESPACE} \
		--set image.app=$(APP_IMAGE) \
		--set ingress.annotations."nginx\.ingress\.kubernetes\.io/force-ssl-redirect"="\"false\"" \
		--set ingress.hosts.app.host=localhost \
		${NAMESPACE} \
		./helm
