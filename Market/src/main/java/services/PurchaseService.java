package services;

import com.lucapolizzo.market.entities.*;
import com.lucapolizzo.market.repositories.PurchaseRepository;
import com.lucapolizzo.market.repositories.PurchasedItemRepository;
import com.lucapolizzo.market.repositories.StoredItemRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import com.lucapolizzo.market.utils.exception.QuantityNotAvailable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final PurchasedItemRepository purchasedItemRepository;
    private final StoredItemRepository storedItemRepository;

    @Transactional
    public List<Purchase> getCustomerPurchases(int cuystomerId) {
        return purchaseRepository.findByCustomer(cuystomerId);
    }

   @Transactional
    public Purchase newAcquisto(Basket basket, Integer userId) throws QuantityNotAvailable {
        List<PurchasedItem> productList = new LinkedList<>();
        double tot = 0;
        for (BasketItem basketItem : basket.getItemsInBasket()) {

            StoredItem itemToPurchase = storedItemRepository.findByCode(basketItem.getStoredItem().getCode());
            int purchasedQuantity = basketItem.getQuantity();
            if ((itemToPurchase.getQuantity() - purchasedQuantity) < 0) {
                throw new QuantityNotAvailable();
            } else {
                int newAvailableQuantity = itemToPurchase.getQuantity() - basketItem.getQuantity();
                itemToPurchase.setQuantity(newAvailableQuantity);
                storedItemRepository.save(itemToPurchase);

                tot += itemToPurchase.getPriceU() * itemToPurchase.getQuantity();
                PurchasedItem purchasedItem = new PurchasedItem();
                purchasedItem.setProduct(itemToPurchase);
                purchasedItem.setQuantity(itemToPurchase.getQuantity());
                System.out.println("new Purchase--- " + purchasedItem);
                purchasedItemRepository.save(purchasedItem);
                productList.add(purchasedItem);
            }
        }
        Purchase purchase = new Purchase();
        purchase.setPurchaseDate(new Date().toString());
        User user = userRepository.findByUserId(userId);
        purchase.setCustomer(user);
        purchase.setTot(basket.getTotal());
        purchase.setPurchasedList(new ArrayList<>(productList));
        purchaseRepository.save(purchase);
        if (purchase.getTot() != tot) throw new RuntimeException();
        return purchase;
    }

   /* public Acquisto getAcquisto(int idAcq) {
        return acquisto_repo.findAcquistoByID(idAcq);
    }

    public List<Acquisto> getAll() {
        return acquisto_repo.findAll();
    }*/

}
